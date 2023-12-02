import requests
import os
import json
import sys

def main():

	print()
	print('Updating Bootstrap...')
	jsonData = fetchJsonFromUrl('https://api.cdnjs.com/libraries/bootstrap/')
	if jsonData is not None and 'error' not in jsonData:
		splitUrl = jsonData['latest'].split('/')
		otherFiles = ['bootstrap.js', 'bootstrap.js.map', 'bootstrap.min.js', 'bootstrap.min.js.map', 'bootstrap.css', 'bootstrap.css.map', 'bootstrap.min.css', 'bootstrap.min.css.map', 'bootstrap.bundle.js', 'bootstrap.bundle.js.map', 'bootstrap.bundle.min.js', 'bootstrap.bundle.min.js.map', 'bootstrap.esm.js', 'bootstrap.esm.js.map', 'bootstrap.esm.min.js', 'bootstrap.esm.min.js.map']
		for fileName in otherFiles:
			splitUrl[-1] = fileName
			splitUrlBackup = ''
			if fileName.endswith('.css') or fileName.endswith('css.map'):
				directory = 'css'
				if splitUrl[-2] == 'js':
					splitUrlBackup = splitUrl[-2]
					splitUrl[-2] = 'css'
			else:
				directory = 'js'
			downloadFile(os.path.join('lib', directory, fileName), '/'.join(splitUrl))	
			# Restore the splitUrl
			if splitUrlBackup != '':
				splitUrl[-2] = splitUrlBackup
	else:
		print('An error occurred while fetching the JSON data.')


	print()
	print('Updating JQuery...')
	jsonData = fetchJsonFromUrl('https://api.cdnjs.com/libraries/jquery/')
	if jsonData is not None and 'error' not in jsonData:
		splitUrl = jsonData['latest'].split('/')
		otherFiles = ['jquery.min.js', 'jquery.js', 'jquery.min.map']
		
		for fileName in otherFiles:
			splitUrl[-1] = fileName
			splitUrlBackup = ''
			if fileName.endswith('.css') or fileName.endswith('css.map'):
				directory = 'css'
				if splitUrl[-2] == 'js':
					splitUrlBackup = splitUrl[-2]
					splitUrl[-2] = 'css'
			else:
				directory = 'js'
			downloadFile(os.path.join('lib', directory, fileName), '/'.join(splitUrl))	
			# Restore the splitUrl
			if splitUrlBackup != '':
				splitUrl[-2] = splitUrlBackup
	else:
		print('An error occurred while fetching the JSON data.')

	print()
	print('Updating Feather Icons...')
	jsonData = fetchJsonFromUrl('https://api.cdnjs.com/libraries/feather-icons/')
	if jsonData is not None and 'error' not in jsonData:
		splitUrl = jsonData['latest'].split('/')
		otherFiles = ['feather.min.js', 'feather.js', 'feather.js.map', 'feather.min.js.map']
		
		for fileName in otherFiles:
			splitUrl[-1] = fileName
			splitUrlBackup = ''
			if fileName.endswith('.css') or fileName.endswith('css.map'):
				directory = 'css'
				if splitUrl[-2] == 'js':
					splitUrlBackup = splitUrl[-2]
					splitUrl[-2] = 'css'
			else:
				directory = 'js'
			downloadFile(os.path.join('lib', directory, fileName), '/'.join(splitUrl))	
			# Restore the splitUrl
			if splitUrlBackup != '':
				splitUrl[-2] = splitUrlBackup
	else:
		print('An error occurred while fetching the JSON data.')

	# Does not work automatically because the mjs files use import which is not supported by the client
	# print()
	# print('Updating PDF Viewer...')
	# jsonData = fetchJsonFromUrl('https://api.cdnjs.com/libraries/pdf.js/')
	# if jsonData is not None and 'error' not in jsonData:
	# 	splitUrl = jsonData['latest'].split('/')
	# 	otherFiles = ['pdf.min.mjs', 'pdf.mjs', 'pdf.mjs.map', 'pdf.sandbox.min.mjs', 'pdf.sandbox.mjs', 'pdf.sandbox.mjs.map', 'pdf.worker.min.mjs', 'pdf.worker.mjs', 'pdf.worker.mjs.map', 'pdf_viewer.css', 'pdf_viewer.min.css', 'pdf_viewer.mjs', 'pdf_viewer.mjs.map']
	# 	for fileName in otherFiles:
	# 		splitUrl[-1] = fileName
	# 		splitUrlBackup = ''
	# 		if fileName.endswith('.css') or fileName.endswith('css.map'):
	# 			directory = 'css'
	# 			if splitUrl[-2] == 'js':
	# 				splitUrlBackup = splitUrl[-2]
	# 				splitUrl[-2] = 'css'
	# 		else:
	# 			directory = 'js'

	# 		downloadFile(os.path.join('lib', directory, fileName), '/'.join(splitUrl))	
	# 		# Restore the splitUrl
	# 		if splitUrlBackup != '':
	# 			splitUrl[-2] = splitUrlBackup
	# else:
	# 	print('An error occurred while fetching the JSON data.')
	
	print()
	print('Updating Google Charts...')
	downloadFile(os.path.join('lib', 'js', 'gcharts.min.js'), 'https://www.gstatic.com/charts/loader.js')

	print()
	print('Updating Google Analytics...')
	downloadFile(os.path.join('lib', 'js', 'gtag.min.js'), 'https://www.googletagmanager.com/gtag/js?id=G-LGHB6S47PK')

	print('Files successfully updated.')

# Fetches the JSON data from the specified URL
def fetchJsonFromUrl(url):
	try:
		# Send a GET request to the URL
		response = requests.get(url)
		response.raise_for_status()  # Check if the request was successful
		# Parse the JSON content directly
		json_data = response.json()
		return json_data
	except Exception as e:
		print(f"An error occurred: {str(e)}")
		return None

# Downloads the file from the specified URL and saves it to the specified path
def downloadFile(filePath, url):
	print(f'\tDownloading {url} to {filePath}...')
	try:
		# Send a GET request to the URL
		response = requests.get(url, stream=True)
		response.raise_for_status()  # Check if the request was successful

		# Open the file for binary writing
		with open(filePath, 'wb') as file:
			# Iterate through the response content and write it to the file
			for chunk in response.iter_content(chunk_size=8192):
				file.write(chunk)
	except Exception as e:
		print(f"An error occurred: {str(e)}")

if __name__ == '__main__':
	main()