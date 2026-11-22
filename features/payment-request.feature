Feature: Create Payment Request

    Scenario: Merchant creates a payment draft
        Given a merhcant wants to requetst 0.5 Sol
        And the merchant has a recipient wallet address
        When the merchatn submits the payment request
        Then the system should return HTTP 201
        And the payment status shold be "draft"

    Scenario: Merchant submits incomplete payment information
        Given a merchant has missing payment information
        When the merchant submits the payment request
        Then the system should return HTTP 400
        And the payment should not be created
    
    Scenario: Reject an unsupported cryptocurrency
        Given a merchant requests payment in BTC
        When the payment request is submitted
        Then the system should return HTTP 400
        And the error should be "Unsupported asset"

    Scenario: Reject an invalid payment amount
        Given a merchant requests a negative SOL amount
        When the payment request is submitted
        Then the system should return HTTP 400
        And the error should be "Invalid payment amount"

    Scenario: Reject an invalid recipient address
        Given a merchant enters an invalid Solana address
        When the payment request is submitted
        Then the system should return HTTP 400
        
    Scenario: Reject an invalid Solana wallet address
        Given a merchant provides an invalid Solana wallet address
        When the merchatn submits a payment request
        Then the system should return HTTP 400
        And the error should be "Invalid Solanda recipient address"
    