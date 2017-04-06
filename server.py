# encoding: utf-8
from __future__ import unicode_literals

from AppChains import AppChains

from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
from urlparse import urlparse
import requests
import json

PORT = 4000

class UsageExample(object):
    url = 'api.sequencing.com'
    token = 'b916754b6eee4c3c6266b029be3b26126a2d259f' # SHORT-LIVED and also to a service IDGAF about and doesnt have my credit card anyways

    def __init__(self):
        self.chains = AppChains(self.token, self.url)
        #print(self.get_public_beacon_test())
        #print(self.get_raw_report_test())
        #self.get_report_test()
        #self.get_report_batch_test()


    def get_public_beacon_test(self):
        beacon_result = self.chains.getPublicBeacon(1, 2, 'A')
        return beacon_result

    def get_raw_report_test(self, fileId, accessToken):
        self.chains.setToken(accessToken)
        chains_raw_result = self.chains.getRawReport(
            'StartApp', 'Chain12', fileId)
        return chains_raw_result

    def get_report_test(self):
        chains_result = self.chains.getReport(
            'StartApp', 'Chain87', '227680')
        if chains_result.isSucceeded():
            print('Request has succeeded')
        else:
            print('Request has failed')
        for r in chains_result.getResults():
            file_type = r.getValue().getType()
            v = r.getValue()
            if file_type == 'TEXT':
                print('-> text result type {} = {}'.format(
                    r.getName(), v.getData()))
            elif file_type == 'FILE':
                print(' -> file result type {} = {}'.format(
                    r.getName(), v.getUrl()
                ))
                v.saveTo('/tmp')

    def get_report_batch_test(self):
        chains_results = self.chains.getReportBatch(
            'StartAppBatch', {'Chain85': '227680', 'Chain88': '227680'})
        for chains_result in chains_results:
            if chains_results[chains_result].isSucceeded():
                print('Request has succeeded')
            else:
                print('Request has failed')
            for r in chains_results[chains_result].getResults():
                file_type = r.getValue().getType()
                v = r.getValue()
                if file_type == 'TEXT':
                    print('-> text result type {} = {}'.format(
                        r.getName(), v.getData()))
                elif file_type == 'FILE':
                    print(' -> file result type {} = {}'.format(
                        r.getName(), v.getUrl()
                    ))
                    v.saveTo('/tmp')

class RequestHandler(BaseHTTPRequestHandler):
  #Handler for the GET requests

  def do_GET(self):
    if self.path == '/favicon.ico':
        return
    else:
        print self.path

    fileId = self.path.split('&id=')[1]
    accessToken = self.path.split('&id=')[0].split('?token=')[1]
    print accessToken
    print fileId

    data = UsageExample().get_raw_report_test(fileId, accessToken)

    self.send_response(200)
    self.send_header('Content-type', 'application/json')
    self.send_header('Access-Control-Allow-Origin', '*')
    self.send_header('Access-Control-Allow-Headers', '*')
    self.send_header('Access-Control-Allow-Methods', '*')
    self.end_headers()
    self.wfile.write(json.dumps(data))
    return

try:
  #Create a web server and define the handler to manage the
  #incoming request
  server = HTTPServer(('', PORT), RequestHandler)
  print 'Started httpserver on port ' , PORT
  
  #Wait forever for incoming htto requests
  server.serve_forever()

except KeyboardInterrupt:
  print '^C received, shutting down the web server'
  server.socket.close()
