
export const throttle = (func, delay) => {
	var timer = null;            
    return () =>{                              
        if (!timer) {                    
            timer = setTimeout(func, delay);                
        }            
    }       
}