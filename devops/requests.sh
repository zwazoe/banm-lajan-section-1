
#!/bin/bash

PAYMENT_BODY='{
    "asset": "SOL",
    "amount": "0.5",
    "recipient": "DEAmHoB5ioA1tGXTBtTCfCxR2Lb3fERoNFEjXTmmEzA4"
}'

# 1. Check the payment API health
echo "=== Health Check ==="

curl -i http://localhost:4000/health

echo

# 2. BDD: Create a payment draft

echo "=== Create Payment Draft ==="

curl -i -X POST http://localhost:4000/payments \
    -H "Content-Type: application/json" \
    -d "$PAYMENT_BODY"

echo

# 3. BDD: Reject incomplete payment information

echo "=== Invalid Payment Request ==="

curl -i -X POST http://localhost:4000/payments \
    -H "Content-Type: application/json" \
    -d '{}'

echo

#BDD: Reject an invalid Solana wallet address

echo "=== Invalid Solana Address ==="

curl -i -X POST http://localhost:4000/payments \
    -H "Content-Type: application/json" \
    -d "$PAYMENT_BODY"

echo

#BDD: List supported payment statuses


echo "=== Payment Lifecycle Statuses ==="

curl -i http://localhost:4000/payments/statuses 

echo 