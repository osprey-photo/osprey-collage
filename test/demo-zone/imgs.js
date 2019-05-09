
const path = require('path');
var Jimp = require('jimp');

const createImage = async (width=200,height=200,bkg='#FFFFFF') => {
	return new Promise((resolve,reject)=>{
		new Jimp(width, height, bkg , (err, image) => {
			if (image){		
				resolve(image);
			} else {
				reject(err);
			}
		} )
	})
}

const makeTestImages = async () => {

   const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

   for (let i =0; i<10; i++){
   	  let image = await createImage(200,200,'#FF00FF');
   	  image.print(font,10,10,`Image ${i}`);
   	  console.log(`Writing test imgage ${i}`);
   	  await image.writeAsync(`./imgs/image${i}.png`);
   }
	
}

let finalImage = {
	width:600,
	height:600
}

const main = async () => {

	//await makeTestImages();   
	// create the large image
	finalImage.image = await createImage(finalImage.width,finalImage.height);
	// load the images

	let images = [];
	for (let i=0; i<9; i++){
		let img = await Jimp.read(`./imgs/image${i}.png`);
		let x = (i % 3)*200;
		let y = (~~(i / 3))*200;
		console.log(`Image ${i} at ${x} : ${y}`)
		await finalImage.image.composite(img,x,y)
	}
	await finalImage.image.writeAsync('./imgs/final.png');
}

// run main
main().then(()=>{
	console.log('Done...');
}).catch( (err)=>{
	console.log(err.stack);
})