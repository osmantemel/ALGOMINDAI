from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bardapi import Bard, SESSION_HEADERS
import sqlite3


def yapayzekdangelencevap(text):
    onePSID = "fAhBFJDSrKE-1MY6HUYdMtmC4m_5l7_ztTZjK-CngV4lO5qiPFabd_j5sYjdMA4CK4Y5Dg."
    onePSIDTS = "sidts-CjIBPVxjSnnJCqcLtR7ux56PNgJUwFla1AYU8nxLgebBfjnHpdJ2-uvh9i_89rnwoZuaSBAA"
    onePSIDCC = "ABTWhQH-pUG7rH3c1eLI7wakuRpYaBXnEvLZZDMMxumMK2inh7XLVtnAX8OiTqjJzqWthb7bgA"

    session = requests.Session()
    session.headers = SESSION_HEADERS
    session.cookies.set("__Secure-1PSID", onePSID)
    session.cookies.set("__Secure-1PSIDTS", onePSIDTS)
    session.cookies.set("__Secure-1PSIDCC", onePSIDCC)

    bard = Bard(token=onePSID, session=session, language='turkish')

    try:
        result = bard.get_answer(text)
        print(result['content'])
        return result['content']
    except Exception as e:
        print(f'Hata: {str(e)}')
        return f'Hata: {str(e)}'

def DataBaseEkle(data):
    try:
        # SQLite veritabanına bağlan
        conn = sqlite3.connect('veritabani.db')
        cursor = conn.cursor()

        # Tabloyu oluştur (eğer yoksa)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS kullanici (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT,
                last_name TEXT,
                email TEXT,
                phone TEXT,
                password TEXT
            )
        ''')
        conn.commit()

        # Veritabanına ekle
        cursor.execute('''
            INSERT INTO kullanici (first_name, last_name, email, phone, password)
            VALUES (?, ?, ?, ?, ?)
        ''', (data.get('firstName'), data.get('lastName'), data.get('email'), data.get('phone'), data.get('password')))

        conn.commit()
        print('Kullanıcı başarıyla eklendi')

    except Exception as e:
        print(f'Hata: {str(e)}')

    finally:
        # Bağlantıyı kapat
        if conn:
            conn.close()

def geriBildirimGonder(data):
    try:
        # SQLite veritabanına bağlan
        conn = sqlite3.connect('veritabani.db')
        cursor = conn.cursor()

        # Tabloyu oluştur (eğer yoksa)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS geriBildirim (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fullName TEXT,
                email TEXT,              
                messages TEXT
            )
        ''')
        conn.commit()

        # Veritabanına ekle
        cursor.execute('''
            INSERT INTO geriBildirim (fullName, email, messages)
            VALUES (?, ?, ?)
        ''', (data.get('name'), data.get('email'), data.get('message')))

        conn.commit()
        print('Geri Bildirim başarıyla eklendi')

    except Exception as e:
        print(f'Hata: {str(e)}')
        return e

    finally:
        # Bağlantıyı kapat
        if conn:
            conn.close()

def girisKontrol(data):
    password =data.get('password')
    email =data.get('email')
    try:
        conn = sqlite3.connect('veritabani.db')
        cursor = conn.cursor()

        # Kullanıcıyı e-posta ile sorgula
        cursor.execute('SELECT * FROM kullanici WHERE email=?', (email,))
        user = cursor.fetchone()

        if user and user[5] == password:  # user[5] veritabanındaki şifre sütununu temsil eder
            print("giris basarılı")
            return True
        else:
            print("giris basarısız")
            return False


    finally:
        if conn:
            conn.close()

app = Flask(__name__)
CORS(app) 

@app.route('/receive_text', methods=['POST'])
def receive_text():
    try:
        data = request.json
        received_text = data.get('text', '')
        print(f'JS tarafından gönderilen metin: {received_text}')

        text = yapayzekdangelencevap(received_text)
        return jsonify({'response': text})
    except Exception as e:
        print(f'Hata: {str(e)}')
        return jsonify({'error': f'Hata: {str(e)}'}), 500


@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        DataBaseEkle(data)
        
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': f'Hata: {str(e)}'}), 500


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        data=girisKontrol(data)
        print("python try")
        return jsonify({'success': data}), 200
    except Exception as e:
        print("python exept")

        return jsonify({'error': f'Hata: {str(e)}'}), 500

@app.route('/iletisim', methods=['POST'])
def iletisim():
    try:
        data = request.get_json()
        print(data)
        geriBildirimGonder(data)
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': f'Hata: {str(e)}'}), 500




if __name__ == '__main__':
    app.run(debug=True)






