var uploadPicture = document.getElementById('uploadPicture');
var gallery = document.getElementById('gallery');
uploadPicture.addEventListener('change',function(){
	
	var image = document.createElement('img');

	var reader = new FileReader();

	reader.onload = function(e){
		gallery.innerHTML+='<img width=\'300\' height =\'300\' src=\''+e.target.result+'\'>';
	}

	reader.readAsDataURL(uploadPicture.files[0]);

});