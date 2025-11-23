# Simulated in-memory DB
USERS = {}
CONSENT = {}
DECISIONS = []


def update_user(user_id, profile):
    USERS[user_id] = profile


def get_user(user_id):
    return USERS.get(user_id, None)


# FIXED default consent + keys
def set_consent(user_id, consent):
    CONSENT[user_id] = consent


def get_consent(user_id):
    return CONSENT.get(
        user_id,
        {
            "allow_credit_scoring": True,
            "allow_personalization": False,
            "allow_transaction_analysis": True,
        },
    )


def log_decision(record):
    DECISIONS.append(record)


def get_decision_logs(user_id):
    return [d for d in DECISIONS if d["user_id"] == user_id]
