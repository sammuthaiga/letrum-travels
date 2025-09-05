#!/bin/bash

# Letrum Agency API Test Suite
echo "🚀 Starting Letrum Agency API Tests..."

BASE_URL="http://localhost:5001"

# Function to test API endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local data=$4
    
    echo "Testing: $description"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "%{http_code}" -o /tmp/response.json "$BASE_URL$endpoint")
    elif [ "$method" = "POST" ]; then
        response=$(curl -s -w "%{http_code}" -o /tmp/response.json -X POST -H "Content-Type: application/json" -d "$data" "$BASE_URL$endpoint")
    fi
    
    if [ "$response" = "200" ] || [ "$response" = "201" ]; then
        echo "✅ $description - Status: $response"
        # Show first few lines of response
        head -3 /tmp/response.json | jq '.' 2>/dev/null || cat /tmp/response.json | head -3
    else
        echo "❌ $description - Status: $response"
        cat /tmp/response.json
    fi
    echo "---"
}

# Wait for server to be ready
echo "⏳ Waiting for server to be ready..."
sleep 3

echo "1️⃣ Testing Health & Basic Endpoints"
test_endpoint "GET" "/api/v1/health" "Health Check"
test_endpoint "GET" "/api/v1" "API Root"

echo "2️⃣ Testing Flight Endpoints"
test_endpoint "GET" "/api/v1/flights" "Get All Flights"
test_endpoint "GET" "/api/v1/flights/popular-destinations" "Popular Destinations"
test_endpoint "GET" "/api/v1/flights/search?origin=NBO&destination=DXB&passengers=2" "Flight Search"

echo "3️⃣ Testing Car Rental Endpoints"
test_endpoint "GET" "/api/v1/cars" "Get All Cars"
test_endpoint "GET" "/api/v1/cars/categories" "Car Categories"
test_endpoint "GET" "/api/v1/cars/popular-locations" "Popular Car Locations"
test_endpoint "GET" "/api/v1/cars/search?location=Nairobi&category=Economy" "Car Search"

echo "4️⃣ Testing Tour Endpoints"
test_endpoint "GET" "/api/v1/tours" "Get All Tours"
test_endpoint "GET" "/api/v1/tours/popular" "Popular Tours"

echo "5️⃣ Testing Product Endpoints"
test_endpoint "GET" "/api/v1/products" "Get All Products"

echo "6️⃣ Testing Visa Endpoints"
test_endpoint "GET" "/api/v1/visa" "Get Visa Requests"

echo "🎉 API Testing Complete!"
echo "📊 Check the results above to verify all endpoints are working"
