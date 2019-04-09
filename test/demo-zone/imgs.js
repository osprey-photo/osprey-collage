
const path = require('path');

var Jimp = require('jimp');



const createImage = async () => {
	return new Promise((resolve,reject)=>{
		new Jimp(200,200, '#FF00FF' , (err, image) => {
			if (image){		
				resolve(image);
			} else {
				reject(err);
			}
		} )
	})
}

const main = async () => {

   const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

   for (let i =0; i<10; i++){
   	  let image = await createImage();
   	  image.print(font,10,10,`Image ${i}`);
   	  await image.writeAsync(`./imgs/image${i}.png`);
   }
	
}


// run main
main().then(()=>{
	console.log('Done...');
}).catch( (err)=>{
	console.log(err.stack);
})