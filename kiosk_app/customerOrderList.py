import os
import csv

ORDER_CSV_FILE = 'kiosk_app/customerOrderList.csv'

    
def save_order_list(total_price, packaging_preference, order_details, name="default", age=-1):
    # Check if the CSV file exists, if not, create it with header
    if not os.path.exists(ORDER_CSV_FILE):
        with open(ORDER_CSV_FILE, 'w', newline='') as csvfile:
            fieldnames = ['Name', 'Age', 'Total Price', 'Packaging Preference', 'Order Details']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()

    # Append the order details to the CSV file
    with open(ORDER_CSV_FILE, 'a', newline='') as csvfile:
        fieldnames = ['Name', 'Age', 'Total Price', 'Packaging Preference', 'Order Details']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writerow({
            'Name': name,
            'Age': age,
            'Total Price': total_price,
            'Packaging Preference': packaging_preference,
            'Order Details': order_details
        })
      
        
#로그인 한 회원의 주문 내역을 불러오는 함수
def get_order_list(name, age):
    pass
