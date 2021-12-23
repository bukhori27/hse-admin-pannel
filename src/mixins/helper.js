// export const helper = {
//   data () {
//     return {
//     	status: 'admin'
//     }
//   },
//   	methods: {
// 	    changeStatus (data) {
// 	    	if(data === 1) {
// 	    		return this.status = 'Admin'
// 	    	}else if(data === 2) {
// 	    		return this.status = 'Reporter'
// 	    	}else if(data === 3) {
// 	    		return this.status = 'Manager'
// 	    	}else if(data === 4) {
// 	    		return this.status = 'Executor'
// 	    	// }else if(data === 5) {
// 	    	// 	return this.status = 'admin'
// 	    	// }else if(data === 6) {
// 	    	// 	return this.status = 'admin'
// 	    	}
	      
// 	    },
// 	}
// }
export function changeStatus (state) {
	var data = parseInt(state)
	if(data === 1) {
		return 'Admin'
	}else if(data === 2) {
		return 'Manager'
	}else if(data === 3) {
		return 'Reporter'
	}else if(data === 4) {
		return 'Observer'
	}else if(data === 5) {
		return 'Executor'
	}else if(data === 6) {
		return 'PIC'
	}

}
