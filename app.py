from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/mensaje", methods=["POST"])
def mensaje():
    user_msg = request.json.get("mensaje", "").lower()

    respuestas = {
    "hola": "¡Hola! ¿Qué dulce te gusta más?",
    "gomitas": "¡Las gomitas son las favoritas de todos!",
    "caramelo": "¡Caramelos duros y suaves, tenemos de todo!",
    "gracias": "¡Con gusto, vuelve pronto a DulceChat!",
    "chocolate": "¡El chocolate nunca falla, tenemos con leche, oscuro y blanco!",
    "menta": "¡Los caramelos de menta son perfectos después de comer!",
    }


    respuesta = respuestas.get(user_msg, "Hmm, todavía estoy aprendiendo sobre ese dulce... ¡pero suena delicioso!")
    return jsonify({"respuesta": respuesta})

if __name__ == "__main__":
    app.run(debug=True)

