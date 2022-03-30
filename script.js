let c=document.getElementId("my-canvas");
let ctx= c.getContext("2d");

let loadImage=(src,callback)=> {
 let img = document.createElement("img");
 img.onload=() => callback(img);
 img.src="https://cdn.glitch.global/61210fac-b0c7-44d0-a5f7-947d0c908b01/thumbnails%2Fidle.png?1648663167296";
}

let imagePath= (frameNumber,animation)=> {
 return ""+animation +"/"+frameNumber+".png";
}
let frames={
 idle:[1,2,3,4,5,6,7,8],
 kick:[kick1,kick2,kick3,kick4,kick5,kick6,kick7],
 punch:[punch1,punch2,punch3,punch4,punch5,punch6,punch7],
}
let loadImages=(callback)=>{
 let images={idle:[], kick:[], punch:[]};
 let imagesToLoad=0;
 ["idle", "kick", "punch"].forEach(animation)=>{
  let animationFrames=frames[animation];
  imagesToLoad=imagesToLoad+ aniamtionFrames.length;
  aniamtionFrames.forEach(frameNumber)=>{
   let path=imagePath(frameNumber,animation);
   loadImage(path, (image)=> {
   images[animation][frameNumber-1]= image;
   imagesToLoad=imagesToLoad-1;

   if (imagesToLoad===0){
    callback(images);
  let imagesToLoad=8;
   }
  })
 })
})
}

let animate=(ctx, images,animation, callback)=>{
 images[animation].forEach(image,index)=>{
  setTimeout(()=>{
   ctx.clearRect(0,0,500,500);
   ctx.drawImage(image, 0, 0 , 500, 500);
  }, index*100);
})
 setTimeout(callback, images[animation].length*100);
}
loadImages(images )=>{
 let queuedAnimations=[];

 let aux =() => {
  let selectedAnimation;
  if (queuedAnimations.length===0){
   selectedAnimation="idle"
  }else{
   selectedAnimation=queuedAnimations.shift();
  }

  animate(ctx, images,selectedAnimation,aux)
}
 aux();
 document.getElementById("kick").onclick = ()=>{
  queuedAnimations.push("kick");
}
document.getElementById("punch").onclick = ()=>{
 queuedAnimations("punch");
}
})
