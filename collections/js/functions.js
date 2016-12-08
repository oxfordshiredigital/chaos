/*
* Functions for Chaos Jewellery Website
* @author Simone Folador - info@alberon.co.uk
* 2010
*/

$(document).ready(function(){
  /* highlights the current page (for Viart, in CMSMS this is automatic) */
  if (giveFriendlyUrl(document.location.toString())){
    var currentPage = giveFriendlyUrl(document.location.toString());
    /* sets the color of the a that has as href the same string as currentPage */
    $("#top-menu-container a[href=\"/"+currentPage+"\"]").css("color","#DC3481");
  }
  
  $(".product-listitem-container").mouseover(function(e){
    
    /*
     * Get position and dimensions of this element (the one the mouse is over)
     */
    var left    = $(this).position().left;
    var top     = $(this).position().top;
    var width   = $(this).outerWidth();
    var height  = $(this).outerHeight();

    /* Get dimensions of the content container */
    var containerWidth  = $(this).parent().outerWidth();
    var containerHeight = $(this).parent().outerHeight();
    var containerLeft   = $(this).parent().position().left;
    var containerTop    = $(this).parent().position().top;
  
    /* Get dimensions of the thumb container */
    var elementHeight = $(".product-bigger-thumb-container").outerHeight();
    var elementWidth  = $(".product-bigger-thumb-container").outerWidth();
  
    /* final position of the thumb container if it is not out of the main container*/
    var finalLeft = left + width + 3;

    /* top position is the same as this element (the one the mouse is over)*/
    var finalTop = top + 1;
    
    /* visible height of the window */
    var windowHeight = document.documentElement.clientHeight + document.documentElement.scrollTop;
    
    /* if the element is near the right border of the container*/
    if((finalLeft-width)>(containerWidth + width)){
      finalLeft = left - elementWidth-2;
    }
  
    /* if the element is near the bottom border of the container but doesn't go out of the window*/
  /*  if(((finalTop+elementHeight) > containerHeight+height ) && !(windowHeight - e.pageY < elementHeight) ){
      finalTop = finalTop - elementHeight;
    }*/
    
    /* if the box is going under the visible part of the window*/
    /*if ( (windowHeight - e.pageY < elementHeight)){
      finalTop = finalTop - elementHeight + 1;
    }*/
    
    if (finalTop > windowHeight - elementHeight - containerTop)
    {
      finalTop = windowHeight - elementHeight - containerTop;
    }
    
    // the url of the image that will be placed into the bigger-thumb-container
    var src = $(this).children("div").children("a").children("img").attr("src");
    if (src == "")
    {
      $(this).children("div").children("a").children("img").attr("src", "images/no_image.gif");
    }
    
    /* get the big image */
    var srcPart = giveBigImage(src,'big',1);

    // on the home page path is different
    if (document.location == 'index.html') {
      var srcPart = src;
      //alert(src + ' - ' +srcPart);
    }
      
    /* shows the thumb-container (it's hidden with inline style by default) */
    $(".product-bigger-thumb-container img").attr("src", srcPart).css({width: elementWidth}).show();
    
    $(".product-bigger-thumb-container").css({left: finalLeft, top:finalTop}).show();
    /* updates the src attribute of the img tag inside the thumb container and gives appropriate width and height to
     * the img
     * */
    
    
  }).mouseout(function(){
    /*
     * on mouse out, the thumb container disappears
     **/
    $(".product-bigger-thumb-container").hide();    
  });
  
  
  /* click behaviour in the product page*/
  $(".product-other-images img").click(function(){
    /*get the thumb img src attribute*/
    var src = $(this).attr("src");  
    
    
    var srcPart = giveBigImage(src,'super',0);
    
    

    
    /* apply the obtained src attribute to the big product image*/
    $(".product-image-container img").attr("src",srcPart);
    
  });
  
  var cssColor="";
  
  $("input.submit").mouseover(function(){
    if (!$(this).hasClass("stays-blue")){
    cssColor =  $(this).css("background-color");
    $(this).css("background-color","#dc3682");
    }
    else{
        cssColor =  $(this).css("background-color");
        $(this).css("background-color","#dc3682");
    }
  }).mouseout(function(){
    $(this).css("background-color",cssColor);
    
  });
  


  
  /* returns the path to the image of size imageSize*/
  function giveBigImage(src,imageSize,type){
    var splitElements = src.split("../index.html");
    var srcPart="";
    var charact = "../index.html";
    
    var image = splitElements[splitElements.length-1];
    
    
    for (var i=0;i<splitElements.length;i++){
      if (i==splitElements.length-2) {
        splitElements[i] = imageSize; 
      }
      if (i==splitElements.length-1){
        charact = "";
      }
      /* "recompose" the url*/
      srcPart+= splitElements[i] + charact;
      
    }
    
    return srcPart;
  }
  
  /* extracts the friendly url of the page */
  function giveFriendlyUrl(url){
    var splitElements = url.split("../index.html");
    return splitElements[splitElements.length-2];
  }
  
  $("#left-container-pages div").each(function(){
    
    //$(this).css("border","1px solid black");
    
  });

});
