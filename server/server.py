#!/usr/bin/env python

from flask import Flask, request, Response
from flask_cors import CORS as flask_cors
from tool_descriptions import tool_descriptions
import subprocess

app = Flask('cis-server')
flask_cors(app)

@app.route('/run-nmap', methods=['POST'])
def run_nmap():
  data = request.get_json()
  proc = subprocess.Popen(
    "nmap " + ' '.join(data["flags"]) + ' ' + data["ip"],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    shell=True
  )
  def generate():
    while True:
      line = proc.stdout.readline()
      if not line: break
      yield line
  return Response(generate(), mimetype='text/plain')
@app.route('/about', methods=['POST'])
def about():
  data = request.get_json()
  tool = data["tool"]
  description = tool_descriptions[tool]
  return Response(description, mimetype='text/plain')
if __name__ == '__main__':
  app.run(host="0.0.0.0")
