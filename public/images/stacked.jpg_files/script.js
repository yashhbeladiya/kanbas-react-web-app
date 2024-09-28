// object.watch
if (!Object.prototype.watch) {
	Object.defineProperty(Object.prototype, "watch", {
	  	enumerable: false, 
	  	configurable: true, 
	  	writable: false, 
	  	value: function (prop, handler) {
			var oldval = this[prop], 
				newval = oldval, 
				getter = function () { return newval; }, 
				setter = function (val) {
					oldval = newval;
					return newval = handler.call(this, prop, oldval, val);
				};
			
			if (delete this[prop]) { // can't watch constants
				Object.defineProperty(this, prop, {
					  get: getter, 
					  set: setter, 
					  enumerable: true, 
					  configurable: true
				});
			}
		}
	});
}

// set HTML element global variables
var container	= document.getElementById('container'),
	logo		= document.getElementById('logo'),
	frame1		= document.getElementById('frame1'),
	frame1_img	= document.getElementById('frame1_img'),
	frame2		= document.getElementById('frame2'),
	frame5		= document.getElementById('frame5'),
	frame5_img		= document.getElementById('frame5_img'),
	ctaBox		= document.getElementById('ctaBox'),
	block_click = false,
	products_info = [],
	delayTime = 2.8,
	isError = false,
	carousel_speed = 0.35,
	car_here = false,
	bus_here = false,
	feedresponse_has_fired = false,
	refire = true,
	endCarouselActive = true,
	clickerDrag = .05,
    currentFrame = 0;
	holidayDate = null,
	variables = null;
	f2Done = false;

	var f2Carousel = 0; //feedback-03062024

	Ad = {

		/*
		 *  Ad and image sizes.  Just change these numbers to update the ad.
		 */
		WIDTH      : 728,
		HEIGHT 	   : 90,
		IMG_HEIGHT : 155,
		IMG_WIDTH  : 155,
		moveTL: 'a',

		LOADED : false, // ad status. do not change.


/*
 *  Initialize creative
 */
		init : function(){
			// build creative
			Ad.addElements();

			Ad.watch('LOADED', Ad.ready);

		},
		/*
		 *  Animate creative
		 */
		animate : function() {
			TweenMax.to(container, 0.3, {opacity: 1});
			
			if(isError){
				return;
			}

			container.classList.remove('hidden');
			// logo.classList.remove('hidden');
			frame1.classList.remove('hidden');
			frame2.classList.remove('hidden');

            function introFrame() {	
                var introTL = new TimelineMax();
                introTL.set(container, { opacity: 1, delay: .5 });
                
                introTL.addLabel('start');
                introTL.to(tagBottom, .3, {x: -4, y: 7, scale: .6, delay: .5}, 'start');
                introTL.to([tagTop, tagFlat], .3, {transform: "translate3d(-2px, 2px, 1px)", delay: .5}, 'start');
                introTL.to(tagFlat, .3, {opacity: 1}, 'start');

                introTL.addLabel('f2')
                introTL.to(frame1_logo, .5, {x: 0}, 'f2');
				introTL.to(frame2BG, .5, {opacity: 1}, 'f2');
                introTL.to(logoContainer, .5, {x: -289, y: 42, scale: 0.15}, 'f2');
                introTL.to(f1Fold, .5, {x: -1 * Ad.WIDTH}, 'f2');
                introTL.to(frame1, .7, {x: 0, opacity: 1, delay: .2}, 'f2');
                introTL.to(frame1, .7, {x: -1 * Ad.WIDTH, delay: 2}, 'f2');
				
                introTL.to(frame1_copyImg, .7, {x: 0, opacity: 1, delay: 2.2}, 'f2');
			
                introTL.to(frame1_copyImg, .7, {opacity: 0, delay: 4.7}, 'f2');

				frame1.classList.remove('hidden');
			}

			
			/*  animate text in line by line  */
			function animateTextFrame (frame, animation, callback, delay) {
				var frameText  = frame.childNodes[0].childNodes[0].childNodes,
					// delay 	   = 4.8, // delay before showing first line
					lineCount  = 0;
				
				// animate each <span> in the frame
				for(var i = 0; i < frameText.length; i++){
					TweenMax.to(frameText[i], 0.3, {left: 0, right: 0, delay: delay, ease: Strong.easeInOut, onComplete: function() {
						lineCount++; // add one more line to the count
						 if(lineCount === frameText.length && frame.id === 'frame1'){
							
							TweenMax.delayedCall(0.25,zoomOut);
							// logo.classList.remove('hidden');
							TweenMax.to(logo, .5,{opacity:1, ease: Strong.easeInOut,delay: 0})
						}
					}});
					delay += 0.4; // extend delay to add time between lines
				}
			}
			/*  animate text in line by line  */
			function zoomOut() {
				
				frame1.style.backgroundImage = 'none';
				frame1_img.style.backgroundImage = 'none';
				TweenMax.set([frame1,frame1_img],{transformOrigin:"50% 50%"});
				
				var tl = new TimelineMax();
				tl.addLabel("startProducts",.3);

				tl.to([frame1, frame1_img],.20,{opacity:0,delay:.1});//,onComplete:zoomIn});

				TweenMax.delayedCall(.3,startClick);
				
				TweenMax.delayedCall(0,zoomIn);

			}
			
			function startClick() {
				 clickerDrag+=.0115;
				if(refire){
					var d = clickerDrag+.11;
					TweenMax.delayedCall(d,startClick);
				}

			}

			function zoomIn() {
				car_here = true;
                Ad.moveTL	  = new TimelineMax()
				TweenMax.to([frame1,frame1_img],.15,{opacity:0,delay:.01});
				var fstProd = frame2.childNodes[0];
				legal_text.style.opacity = 1;
                TweenMax.set('.item', {left: 728});
                TweenMax.set(fstProd, {left: 0});
				TweenMax.to('.item',2.0,{opacity:1,ease:Circ.easeOut, delay:0.1,onComplete:function () {
					frame2.style.zIndex = "9";
					TweenMax.delayedCall(0.5,moveCarousel);

				}});
				// TweenMax.set(fstProd,{opacity:1,delay:0});

				
                TweenMax.to(arrow_leftOverlay,.35,{opacity:0, display:'none',delay: 2});
                TweenMax.to(arrow_rightOverlay,.35,{opacity:0, display:'none',delay: 2});

				TweenMax.to(arrow_left, 0.5, {opacity: 1, display:'block', left:'72px', ease: Strong.easeInOut, delay:0.1}); // slide in
				TweenMax.to(arrow_right, 0.5, {opacity: 1, display:'block', right:'304px', ease: Strong.easeInOut, delay:0.1}); // slide in
				
			}

			function moveCarousel() {
				
				var carouselItems = frame2.childNodes,
					holdTime	  = .85,
					id 			  = 1;

                
                for(var i = 0; i < (carouselItems.length-1); i++){
					c = i;
                    if (i != 0) {
                        holdTime= 1.85;
                    }
                    Ad.moveTL.addLabel('autoFrames'+i,"+="+holdTime);
                    Ad.moveTL.to(carouselItems[i],.75,{left:-728,ease:Strong.easeOut},'autoFrames'+i);
                    Ad.moveTL.to(carouselItems[i+1],.75,{left:0,ease:Strong.easeOut,onComplete:function(){
                        currentFrame++;
                    }},'autoFrames'+i);
                }
                id = carouselItems.length-1; 
				function frm5(){

						car_here = false;
						bus_here = true;
						TweenMax.set(cta_reg, {opacity:0, zIndex: 1});

						// TweenMax.delayedCall(1,animateTextFrame,[frame2,'slideUp',animateEndFrame]); //feedback-03062024
						// TweenMax.delayedCall(.4,animateEndFrame); //feedback-03062024
						TweenMax.delayedCall(.4,lastFrame); //feedback-03062024

				};/**/
				frm5.name = 'frm5';
				Ad.moveTL.addLabel("prodOut","+="+holdTime);
				// return;
				// Ad.moveTL.to(carouselItems[id],1.3,{opacity:0,ease: Strong.easeOut},"prodOut"); //rotation:"+=65",left:"+=135" //feedback-03062024
				Ad.moveTL.add(frm5,'prodOut');

			}

			function lastFrame(){ //feedback-03062024
                console.log("show");
				f2Done = true;
				let carouselItem = frame2.childNodes;
				
				TweenMax.to(arrow_leftOverlay,.35,{opacity:0, display:'none'});
				TweenMax.to(arrow_rightOverlay,.35,{opacity:0, display:'none'});
				TweenMax.to(cta, 0.2, {opacity:1}, 'f5');
				TweenMax.to("#frame2 .footer_hold", 0.2, {opacity: 0}, {left:-45},'f5');
                
				if(carouselItem.length > 1) {
				TweenMax.set(carouselItem[0], {left: 728, opacity: 0.7, scale: 0.45});
				TweenMax.set(carouselItem[currentFrame-1], {left: -95, opacity: 0.7, scale: 0.45});

				TweenMax.to(arrow_left,.35,{left:"87px"},'f5');
                TweenMax.to(arrow_right,.35,{right:"391px"},'f5');

				TweenMax.to(carouselItem[0], 0.35, {left:-19},'f5');
				TweenMax.to(carouselItem[currentFrame], 0.35, {left: -84, scale: .65},'f5');
				TweenMax.to(carouselItem[currentFrame-1], 0.35, {left: -180},'f5');
				}
				if(carouselItem.length == 1) {
				TweenMax.to(arrow_left,.35,{left:"87px"},'f5');
                TweenMax.to(arrow_right,.35,{right:"325px"},'f5');
				}

				// TweenMax.to(carouselItems[c])
	
				frame5.classList.remove('hidden');
				// frame5_img.classList.remove('hidden');

				ctaBox.style.display = "block";
				arrow_left.style.display = "block";
				arrow_right.style.display = "block";


				if(myFT.instantAds.F5_headline_copy_img.indexOf("blank") >= 0){
					legal    = frame5_img.childNodes[2];
				}else{
					legal    = frame5_img.childNodes[2];
				}
	
				frame5.classList.remove('hidden');
				 TweenMax.to([frame5_img], .5, {opacity: 1, ease: Circ.easeInOut, delay:.7});

	
				
			}


			/*  move frame off screen  */
			
            TweenMax.set(frame1_logo, {x: -1 * Ad.WIDTH});
            TweenMax.set([frame1, frame1_copyImg], {x: Ad.WIDTH / 12});
			// TweenMax.set(frame2, {top: Ad.HEIGHT});
            
            introFrame();
			if(myFT.instantAds.F1_headline_copy_img.includes('blank'))
			{
            animateTextFrame(frame1, 'slideDown', zoomOut, 3);
			}
			else{
				animateTextFrame(frame1, 'slideDown', zoomOut, 5.5);
			}

		},
		/*
		 *  Special end frame carousel with preview products to either side of main, end frame copy displays not price/name
		 */

		setUpCarousel : function(){
			// console.log(products_info.length+' === '+"lastFrame");
			car_here = true;
			for(var i = 0; i < products_info.length; i++){
				//TODO add check in case array is above 3 products but still works for 1,2 or 3
				//(imgHold)
				(products_info[i].slide).style.opacity =1;

				//(products_info[i].clicker).style.opacity = 0;
				(products_info[i].footer).style.opacity = 0;
				(products_info[i].slide).style.top ="20px";
				// TweenMax.set((products_info[i].imageHold),{scaleX:.7,scaleY:.7});
				TweenMax.set((products_info[i].imageHold),{scale: .9, y: 20});
				
				if(i == 1){
					(products_info[i].slide).style.left = "728px";
					(products_info[i].slide).style.opacity = .0;
					TweenMax.set((products_info[i].imageHold),{scale:.45, y: 20 });
				}
				if(i == 2){
					(products_info[i].slide).style.left = "-728px";
					(products_info[i].slide).style.opacity = .0;
					TweenMax.set((products_info[i].imageHold),{scale:.45, y: 20 });

				}
			}
		},

		ctaClick : function(e) {
			myFT.clickTag(3, myFT.instantAds.clickTag3);
		},	

	    prodClick : function(e){
	    	// console.log("prodClick :: "+e.target.id);
	    	// console.log(products_info)
	    	if (car_here) {
	        	var url = products_info[currentFrame].url;
				var trackStr = products_info[currentFrame].sku;
				//myFT.stateTrackingEvent(trackStr, 'ft_section');
				Tracker.clickTrackEvent(trackStr, 'ft_section', false);

				// console.log("skuString on click is :: "+products_info[currentFrame].sku);

				myFT.clickTag(2, url);
	    	}else {
	    		if (bus_here) {
	    			myFT.clickTag(3, myFT.instantAds.clickTag3);
	    		} else {
	    			myFT.clickTag(1, myFT.instantAds.clickTag1);
	    		}	
	    	}
	    },
		/*
		 *  Carousel from endFrame layout to end carousel (displays only one product and product price at a time)
		 */
		
		/*
		 *  Carousel arrow clicks
		 */

		
		lFonArrowClick : function(e) { //feedback-03062024
			Ad.moveTL.stop();
			var isRightClick = (e.target.id === 'arrow_right');
			
			// add
                if(block_click) {
                    return;
                }

				block_click = true;
				var carouselItems = frame2.childNodes;
				const currentItem = frame2.childNodes[currentFrame];

                if(f2Done) {
                    resetf2Carousel()
                }
				else if(isRightClick) {
					
					myFT.tracker('next_arrow_clicked',null,"next_arrow_clicked");
					currentFrame++;
					if(currentFrame == carouselItems.length) {
						currentFrame = 0;
					}
					TweenMax.set(carouselItems[currentFrame], {left: Ad.WIDTH})
					TweenMax.to(currentItem, .5, {left: -1 * Ad.WIDTH, delay: .1, onComplete: () => block_click = false});
					TweenMax.to(carouselItems[currentFrame], .5, {left: 0, delay: .1});
				} else {
					
					myFT.tracker('prev_arrow_clicked',null,"prev_arrow_clicked");
					currentFrame--
					if(currentFrame < 0) {
						currentFrame = carouselItems.length - 1;
					}
					TweenMax.set(carouselItems[currentFrame], {left: - 1 * Ad.WIDTH});
					TweenMax.to(currentItem, .5, {left: Ad.WIDTH, delay: .1, onComplete: () => block_click = false});
					TweenMax.to(carouselItems[currentFrame], .5, {left: 0, delay: .1});
				}

			function resetf2Carousel(){
                f2Done = false;
                block_click = false;
                car_here = true;
				let carouselItem = frame2.childNodes;
				TweenMax.to("#frame2 .footer_hold", 0.2, {opacity: 1,delay:.5}, 'lf');

				if(carouselItem.length > 1) {
				TweenMax.to(arrow_left,.35,{left:"72px"},'lf');
				TweenMax.to(arrow_right,.35,{right:"304px"},'lf');

				TweenMax.set(carouselItem[0], {left: 728, opacity: 1, scale: 1});
				TweenMax.set(carouselItem[currentFrame-1], {left: 728, opacity: 1, scale: 1});
				TweenMax.to(carouselItem[currentFrame], .5, {left: 0, opacity: 1, scale: 1});
				}

				TweenMax.to(arrow_left,.35,{left:"72px"},'lf');
				TweenMax.to(arrow_right,.35,{right:"304px"},'lf');

				frame5.classList.add('hidden');
				// frame5_img.classList.add('hidden');
				TweenMax.to([frame5_copyImg,frame5_img], 0.25, {opacity: 0, ease: Circ.easeInOut, delay:0});
				ctaBox.style.display = "none";

			}
			// ctaBox.style.display = "none";

		
	    },

		cta_over : function(e) {
			TweenMax.to(cta, 0.5, {opacity: 0, ease: Strong.easeInOut}); //feedback-03062024
			TweenMax.to(hover, 0.5, {opacity: 1, ease: Strong.easeInOut}); 
				
		},

		cta_out : function(e) {
			TweenMax.to(hover, 0.5, {opacity: 0, ease: Strong.easeInOut});
			TweenMax.to(cta, 0.5, {opacity: 1, ease: Strong.easeInOut}); //feedback-03062024
		},

		/*
		 *  Create and add elements to container
		 */
		addElements : function() {
			legal_text 	 = document.createElement('p'),
				cta   	 = new Image(),
				hover 	 = new Image();

			// cta
			cta.src = myFT.instantAds.CTA_img;
			cta.id = 'cta_reg';
			cta.classList.add('cta');
			cta.classList.add('ad-size');

			hover.src = myFT.instantAds.CTA_hover_img;
			hover.classList.add('hover');
			hover.id  = 'cta_hover';
			hover.classList.add('ad-size');

			// legal
			legal_text.innerHTML = myFT.instantAds.legal_copy;
			legal_text.classList.add('legal');

			//images
			
            frame1_logo.src = 'BBwhiteLogo.svg';
		
			logo.style.backgroundImage   = 'url('+ myFT.instantAds.logo_img +')';
			frame1_img.style.backgroundImage = 'url(' + variables.F1_background_img + ')';
			frame2BG.src= variables.F5_background_img;

			// frame5.style.backgroundImage = 'url('+ myFT.instantAds.F5_background_img +')';
			// frame5_img.style.backgroundImage = 'url('+ myFT.instantAds.F5_background_img +')';

				frame1.appendChild(Ad.splitHeadline3(myFT.instantAds.F1_headline_copy));
				// frame1.appendChild(Ad.splitHeadline3(document.getElementById(headlineVpeWrap)));

				// frame1.style.opacity = 0;
				frame1_copyImg.src = myFT.instantAds.F1_headline_copy_img;

			


			myFT.applyButton(arrow_left, Ad.lFonArrowClick);
			myFT.applyButton(arrow_right, Ad.lFonArrowClick);

			// myFT.applyButton(arrow_left, Ad.onArrowClick); //feedback-03062024
			// myFT.applyButton(arrow_right, Ad.onArrowClick); //feedback-03062024
 


			// frame 5
            container.appendChild(legal_text);
            frame5_img.appendChild(cta);
            frame5_img.appendChild(hover);
            frame5.appendChild(Ad.splitHeadline2(myFT.instantAds.F5_headline_copy));
			if(holidayDate){
				frame5_img.appendChild(Ad.splitHeadline2(myFT.instantAds.F5_headline_copy));
                frame5.appendChild(legal);
			}else{
				frame5.style.opacity = 0;
				frame5_copyImg.src = myFT.instantAds.F5_headline_copy_img;
			}


			// connect and add feed data
			Feed.connect();

			myFT.applyButton(frame5_img, Ad.prodClick);
			myFT.applyButton(frame2, Ad.prodClick);
			myFT.applyButton(logo, Ad.prodClick);
            myFT.applyButton(frame1, Ad.prodClick);
			myFT.applyButton(frame1_img, Ad.prodClick);
            
			logo.addEventListener("mouseover", Ad.cta_over);
			logo.addEventListener("mouseout", Ad.cta_out);

			myFT.applyButton(ctaBox, Ad.ctaClick);
			ctaBox.addEventListener("mouseover", Ad.cta_over);
			ctaBox.addEventListener("mouseout", Ad.cta_out);

		},

		ellipsisMe : function(str){
	        var revStr = str.split('').reverse().join('');
	        var lastSpc = revStr.indexOf(' ')+1;
	        revStr = revStr.slice(lastSpc,(revStr.length));
	        str = revStr.split('').reverse().join('');
	        str = str+ '...';
	        return str;
	    },

		/*
		 *  Error handler
		 */
		error : function(error) {
			Tracker.impressionTrackEvent('null');
			
			if(!feedresponse_has_fired){
				feedresponse_has_fired = true;
				Ad.LOADED = false;
				console.log(error);
				isError = true;
				container.style.opacity = 1;
				feedFail.style.opacity = 1;
				frame1.style.opacity = 0;
				frame1_img.style.opacity = 0;
				frame2.style.opacity = 0;
				frame5.style.opacity = 0;
				frame5_img.style.opacity = 0;
				logo.style.opacity = 0;

				feedFail.src = myFT.instantAds.backup_img;
				myFT.tracker('fallback_img',null,"fallback_img");
                
			}

		},
		/*
		 *  Ad is ready, begin and show
		 */
		ready : function() {
			// show banner

			TweenMax.delayedCall(.25, Ad.animate);
		},

		/*
		 *  Split headline at line breaks and return node to be added to element
		 */
		splitHeadline3 : function (headline) {
			var ar = headline.split('<br>');
			var color;
			var newHeadline = "";
			var splitter = /<\/span><\/span>/gi,
				wrapper  = document.createElement('div');

			for(var i = 0; i < ar.length; i++){
				if(ar[i].indexOf(/<\/span>/ ) === -1){
					ar[i] += "</span>";
				}

				if(ar[i].indexOf('<span')=== -1){
					ar[i] = "<span style='"+color+"'>"+ar[i];
				}else{
					var stColor = ar[i].indexOf('color');
					var endColor = ar[i].indexOf(";'");
					color = ar[i].slice(stColor, endColor);
				}
				newHeadline += ar[i];

			}
			newHeadline = newHeadline.replace(splitter, '</span>'); // replace <br> with spans

			wrapper.id = 'page_text';
			wrapper.innerHTML = "<span>"+newHeadline+"</span>"; // wrap headline with identifier
			wrapper.className = 'text-wrapper';

			return wrapper;
		},

		splitHeadline2 : function(headline) {
			var splitter = /<br>/gi,
				wrapper  = document.createElement('div');

			headline = headline.replace('>', '><span>'); // add extra opening span for first word
			headline = headline.replace('</', '</span></'); // add extra closing span for last word
			headline = headline.replace(splitter, '</span><span>'); // replace <br> with spans

			wrapper.classList.add('text-wrapper');
			wrapper.id = 'text_wrapper_fm6';
			wrapper.innerHTML = headline; // wrap headline with identifier

			return wrapper;
		}

	};

	Feed = {

		/*
		 *  Set feed parameters and connect
		 */
		connect : function(FeedObj) {
			
            var feedParams, ftFeed;

            // set dynamic parameters
            feedParams = new FTFeedParams();
            feedParams.defaultFeedEndpoint = myFT.instantAds.defaultFeedEndpoint;
            feedParams.feedEndpoint = myFT.instantAds.feedEndpoint;

            // send connection request
            ftFeed = new FTFeed(myFT, feedParams);
            ftFeed.getFeed(Feed.success, Ad.error);
		},
		/*
		 *  Parse data and apply to creative
		 */
		createItem : function(data, num,sku) {
			//IMAGES FOR FRM 2-5
			var imageHold   	= document.createElement('div'),
				image  	    = new Image(),
				footer  	= document.createElement('div'),
				priceHold  	= document.createElement('div'),
				price   	= document.createElement('p'),
				nameHold  	= document.createElement('div'),
				name    	= document.createElement('p'),
				wrapper 	= document.createElement('div'),
				clicker 	= document.createElement('div'),
				imageSize	= '&w='+ Ad.IMG_WIDTH +'&h='+ Ad.IMG_HEIGHT,
				dollarSign  = '<span style="font-size:.9em">$</span>',
				savePrefix  = 'Save '+ dollarSign,
				dollarSave,
				salePrice;

			//carousel images
			var carousel    = document.getElementById('carousel'),
				prodNumber  = num-1,
				wrapperClone,
				imageClone;

			if(data){
				footer.className = 'footer_hold';
				imageHold.className = 'prod_img_holder';
				dollarSave = +data.dollarsavings;
				dollarSave = dollarSave.toFixed(2);
				salePrice = data.saleprice;
				// create image node
				image.onerror = function() {
					image.onerror = '';
					image.src = 'bblogo.png';
					return true;
				};
				image.src = data.image + imageSize;
				image.classList.add('prod_img');
				imageHold.appendChild(image);
				// create price node
				priceHold.className = "prod_price_hold";
				price.innerHTML = (Number(data.percentsavings) > 15) ? savePrefix + dollarSave : dollarSign + salePrice;
				price.classList.add('price');
				priceHold.appendChild(price);
				footer.appendChild(priceHold);

				// create name node
				nameHold.className = "prod_name_hold";
				name.innerHTML = data.name.length > 110 ? Ad.ellipsisMe(data.name.substr(0, 110)) : data.name;
				name.classList.add('name');
				nameHold.appendChild(name);
				footer.appendChild(nameHold);

				clicker.classList.add('clicker');

				//add nodes to wrapper
				wrapper.appendChild(imageHold);
				wrapper.appendChild(footer);
				wrapper.appendChild(clicker);


				wrapper.classList.add('item');
	
				// TweenMax.set(wrapper,{top:-90});


				wrapper.classList.add('ad-size');

				wrapper.style.opacity = 0;

				frame2.appendChild(wrapper); // add item to frame

				//create prod carousel
				prodNumber++;
				wrapperClone = wrapper.cloneNode(true);


				wrapperClone.classList.remove('item');
				wrapperClone.classList.add('slide');
				if(prodNumber ===0){
					wrapperClone.style.left = "0px";
				}
                wrapperClone.id = "slide"+prodNumber;
				carousel.appendChild(wrapperClone);

				var prodUrl = data.url,
					imageHolder = wrapperClone.childNodes[0],
					footerHolder = wrapperClone.childNodes[1],
					priceHolder = footerHolder.childNodes[0],
					nameHolder = footerHolder.childNodes[1];

				products_info.push({id:prodNumber, slide:wrapperClone, url:prodUrl,footer:footerHolder,priceHold:priceHolder,nameHold:nameHolder,imageHold:imageHolder,clicker:clicker,imgURL: data.image + imageSize,sku:sku});

			}
		},

		/*
		 *  Feed connected successfully, route data
		 */
		success : function(feedData, feedUrl) {
			console.log(feedData)
			if(!feedData[0].name){
				if(myFT.instantAds.feedEndpoint=='')
				{
					 Ad.error()
					 return ;
				}
				myFT.instantAds.feedEndpoint="";
				console.log('default feed is active');
				Feed.connect();
				return;
			}

            var productCount = (feedData.length > 5)? 5 : feedData.length; 
			if(!feedresponse_has_fired){
				feedresponse_has_fired  = true;
				var skuString="";
				//for(i in feedData){
				for(var i = 0; i < productCount; i++){
					Feed.createItem(feedData[i], i, feedData[i].sku);
					skuString += feedData[i].sku+"||";
				}

				for(i = 0; i <products_info.length;i++){
					var img = products_info[i].imageHold.childNodes[0];
					img.onerror = function(e) {
						e.target.onerror = '';
						e.target.src = 'bblogo.png';
						return true;
					};
					img.src = products_info[i].imgURL;
				}

				//}
				skuString = skuString.slice(0,skuString.length-2);
				console.log('skuString on impression is :: '+skuString);
				Tracker.impressionTrackEvent(skuString);

				Ad.LOADED = true; // ad is loaded
			}

		}

	};

myFT.on("instantads", function () {
	container.classList.add(checkPlatform()[0] + "-" + checkPlatform()[1]);
	
	variables = myFT.instantAds;
	Ad.init();
}); //initialize ad once ready


function trace(t) {
	const url = document.URL;
	(url.includes("127.0.0.1") || url.includes("localhost") || url.includes("https://creativepreview.flashtalking.net")) 
	&& console.log(t);
  }

  function checkPlatform() {
    try {
        var a = new Array();

        if (navigator.platform.toLowerCase().indexOf("mac") > -1) {
            a[0] = "macOS";
        } else if (navigator.platform.toLowerCase().indexOf("win") > -1) {
            a[0] = "windows";
        } else {
            if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                a[0] = "iOS";
            } else if (navigator.userAgent.match(/Opera Mini/i)) {
                a[0] = "opera";
            } else if (navigator.userAgent.match(/Android/i)) {
                a[0] = "android";
            } else if (navigator.userAgent.match(/BlackBerry/i)) {
                a[0] = "BlackBerry";
            } else if (navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)) {
                a[0] = "WindowsPhone";
            }
        }

        var MSIE = window.navigator.userAgent.indexOf("MSIE ");
        var Edge = window.navigator.userAgent.indexOf("Edge/");
        var Trdt = window.navigator.userAgent.indexOf("Trident/");

        if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
            a[1] = "chrome";
        } else if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
            a[1] = "firefox";
        } else if (navigator.vendor && navigator.vendor.toLowerCase().indexOf("apple") > -1) {
            a[1] = "safari";
        } else if (MSIE > 0 || Edge > 0 || Trdt > 0) {
            a[1] = "IE";
        }

        return a;
    } catch (error) {
        console.error("Error on checkPlatform(): " + error.message);
    }
}