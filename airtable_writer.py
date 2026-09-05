"""
Airtable lead writer for CityAI.

Writes captured leads into the LIVE Citysearchpage 'Leads' table using
FIELD IDs rather than field names, so renaming a column in the Airtable
UI cannot break this integration.

Target (verified 2 Sept 2026):
    base   product catalog   appu6ujFBTfLINzYP
    table  Leads             tblrD6cW0kwIJInVC

Note: this table has NO Email field. Shop owners in India and the UAE give
a WhatsApp number long before they give an email address, so the lead
identity is the phone number.
"""

import os
import time
import json
import urllib.request
import urllib.error

AIRTABLE_API = "https://api.airtable.com/v0"

BASE_ID = os.environ.get("AIRTABLE_BASE_ID", "appu6ujFBTfLINzYP")
TABLE_ID = os.environ.get("AIRTABLE_TABLE_ID", "tblrD6cW0kwIJInVC")

# Verified field IDs — do not replace with field names.
F = {
    "name":     "fldwt5bE71G2QeWVY",
    "phone":    "fldia7YYvw5wtnC6X",
    "whatsapp": "fldcJDLuOMQOo6oV6",
    "email":    "fldR1I04MO9VfW7pz",
    "city":     "fldGCFGuRxBl2xKBM",
    "country":  "fld0q1eLK8ppudpAk",
    "source":   "fldZuMWzVE01bCdf1",
    "interest": "fldS1lHpoqxWKTqgS",
    "status":   "fldmB14gbsIj43cjE",
    "date":     "fldA1ywrEWE2UPFWH",
}

# Airtable allows 5 req/sec per base. Throttle to ~4/sec.
_MIN_INTERVAL = 0.25
_last_call = [0.0]


def _throttle():
    gap = time.time() - _last_call[0]
    if gap < _MIN_INTERVAL:
        time.sleep(_MIN_INTERVAL - gap)
    _last_call[0] = time.time()


def infer_country(phone: str) -> str:
    """Map a phone number to one of the table's Country options."""
    digits = "".join(c for c in (phone or "") if c.isdigit())
    if digits.startswith("971"):
        return "UAE"
    if digits.startswith("91") or len(digits) == 10:
        return "India"
    return "Other"


def valid_email(value: str) -> bool:
    """
    Loose sanity check before writing to Airtable's typed email field.

    The Email column rejects malformed values, and one bad address should
    never cost us the whole lead — an unparseable entry is kept as a note
    in Interest instead (see build_interest).
    """
    v = (value or "").strip()
    if not v or " " in v or v.count("@") != 1:
        return False
    local, _, domain = v.partition("@")
    return bool(local) and "." in domain and not domain.startswith(".") \
        and not domain.endswith(".")


def build_interest(lead: dict) -> str:
    """
    Pack segment, timeline and conversation topics into the Interest field.

    The table has no dedicated Segment or Timeline column and the Airtable
    connection cannot create fields, so this keeps the qualification signal
    in one readable block.
    """
    lines = [
        "Segment: %s" % (lead.get("segment") or "not stated"),
        "Wants to start: %s" % (lead.get("timeline") or "not stated"),
        "Asked about: %s" % (lead.get("topics") or "general"),
    ]
    if lead.get("shop"):
        lines.append("Shop / brand: %s" % lead["shop"])
    # Email has its own column now. Only note it here if it failed validation,
    # so a mistyped address is still recoverable rather than silently dropped.
    raw_email = (lead.get("email") or "").strip()
    if raw_email and not valid_email(raw_email):
        lines.append("Email as typed (not a valid address): %s" % raw_email)
    if lead.get("page"):
        lines.append("Landed on: %s" % lead["page"])
    if lead.get("summary"):
        lines.append("")
        lines.append("Conversation:")
        lines.append(lead["summary"][:4000])
    return "\n".join(lines)


def create_lead(lead: dict, retries: int = 2) -> dict:
    """
    Create one lead record. Returns {"success": bool, ...}.
    Never raises — the caller is a web endpoint and should stay up.
    """
    token = os.environ.get("AIRTABLE_TOKEN")
    if not token:
        return {"success": False, "error": "AIRTABLE_TOKEN not set"}

    phone = (lead.get("phone") or "").strip()

    fields = {
        F["name"]:     (lead.get("name") or "").strip() or "Unnamed lead",
        F["phone"]:    phone,
        F["whatsapp"]: phone,               # same number; shops use one line
        F["city"]:     (lead.get("city") or "").strip(),
        F["country"]:  infer_country(phone),
        F["source"]:   "CityAI",
        F["interest"]: build_interest(lead),
        F["status"]:   "New",
        F["date"]:     time.strftime("%Y-%m-%d"),
    }

    email = (lead.get("email") or "").strip()
    if valid_email(email):
        fields[F["email"]] = email

    payload = json.dumps({
        "records": [{"fields": fields}],
        "typecast": True,
    }).encode("utf-8")

    url = "%s/%s/%s" % (AIRTABLE_API, BASE_ID, TABLE_ID)

    for attempt in range(retries + 1):
        _throttle()
        req = urllib.request.Request(
            url,
            data=payload,
            method="POST",
            headers={
                "Authorization": "Bearer %s" % token,
                "Content-Type": "application/json",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                body = json.loads(resp.read().decode("utf-8"))
            rec = (body.get("records") or [{}])[0]
            return {
                "success": True,
                "record_id": rec.get("id"),
                "created_time": rec.get("createdTime"),
            }
        except urllib.error.HTTPError as e:
            detail = e.read().decode("utf-8", "replace")
            if e.code == 429 and attempt < retries:
                time.sleep(30)          # Airtable asks for a 30s wait
                continue
            return {"success": False, "status": e.code, "error": detail}
        except Exception as e:                       # network, timeout, DNS
            if attempt < retries:
                time.sleep(2)
                continue
            return {"success": False, "error": str(e)}

    return {"success": False, "error": "exhausted retries"}


if __name__ == "__main__":
    print("Config check")
    print("  base  :", BASE_ID)
    print("  table :", TABLE_ID)
    print("  token :", "set" if os.environ.get("AIRTABLE_TOKEN") else "MISSING")
    print()
    print("Country inference:")
    for p in ["+971503602149", "+919156096009", "9876543210", "+41791234567"]:
        print("  %-16s -> %s" % (p, infer_country(p)))
