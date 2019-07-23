var uploadPicture = document.getElementById('uploadPicture');
var gallery = document.getElementById('gallery');
uploadPicture.addEventListener('change',function(){
	
	var image = document.createElement('img');

	var reader = new FileReader();

	reader.onload = function(e){
		gallery.innerHTML+='<img width=\'400\' height =\'450\' src=\''+e.target.result+'\'>';
	}

	reader.readAsDataURL(uploadPicture.files[0]);

});