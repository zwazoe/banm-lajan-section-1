Feature: Payment Storage

    Scenario: Database is available
        Given PostgreSQL is running
        When a client request the database health status
        Then the system should return HTTP 200
        And the database status should be "connected"

    Scenario: Database is unavailable
        Given PostgreSQL is stopped
        When a client requests the database health status
        Then the system should return HTTP 503
        And the database status should be "unavailable"