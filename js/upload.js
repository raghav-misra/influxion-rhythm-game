var stringy

function uploadFile(dataObject, file) {
	alert("Please wait while we process your level! Do not press anything")
	var url = 'https://api.cloudinary.com/v1_1/obliv-cf/auto/upload';
	var xhr = new XMLHttpRequest();
	var fd = new FormData();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.onreadystatechange = function (e) {
		if (xhr.readyState == 4 && xhr.status == 200) {

			// File uploaded successfully
			var tmp = dataObject;
			var response = JSON.parse(xhr.responseText);
			var url = response.secure_url;
			tmp.info.path = url;
			mapStruct = tmp;
			async function getUserAsync() {
				let response = await fetch('https://www.jsonstore.io/a3a8e80eeb67eb27e906c949aaa072678e04093c4febf8d145015c7819fd1843/maps');
				let data = await response.json()
				return data;
			}
			getUserAsync().then(function (data) {
				console.log(data)
				var map = data.result || []; // In case result is null/undefined
				map.push(mapStruct)
				fetch('https://www.jsonstore.io/a3a8e80eeb67eb27e906c949aaa072678e04093c4febf8d145015c7819fd1843/maps', {
					headers: {
						'Content-type': 'application/json'
					},
					method: 'POST',
					body: JSON.stringify(map),
				});
				alert("Your map was uploaded to the community levels!")
				fetch('https://discordapp.com/api/webhooks/602262417615093782/rgJLaDMERQcLQ8vElypadasQdnSZycNGTGZsJ89e3af0TiKLmmFgcqW-ZBN086xZKPZ6', {
						headers: {
							'Content-type': 'application/json'
						},
						method: 'POST',
						body: JSON.stringify({
							content: "Map Uploaded!",
							username: "uploads"
						})



					})
					.then(response => response.json())
					.then(response => console.log('Success:', JSON.stringify(response)))
					.catch(error => console.log('thanks for uploading!'));
				location.href = "index.html"
			});
		}
	};
	fd.append('upload_preset', "ivu0b1k5");
	fd.append('tags', 'browser_upload');
	fd.append('file', file);
	xhr.send(fd);
}

function compileJSON(dataObject, audio) {
	return uploadFile(dataObject, audio);
}