Feature: Payment Lifecycle

    Scenario: List supported payment statuses
        Given the payment API is running
        When a client request the supported payment status
        Then the system should return HTTP 200
        And the response should include "draft"
        And the response should include "pending"
        And the response should include "confirmed"
        And the response should include "failed"