<template>
  	<b-container class="no-padding" fluid>
  		<b-row class="container-before-footer">
  		</b-row>
	    <b-row class="container-footer1">
	    	<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 row footer1-left" style="padding: 10px;">
				<div class="col-md-6 col-lg-6 col-sm-12 col-xs-12 row">
		          <div class="col-md-12 row">
		            <div class="col-md-12 fs20 c-g1"> 
            		<b-img src="static/img/logo/logo.png" fluid alt="Responsive image" style="height:100px;" class="logoHome2"/>
		            </div>
		            <div class="col-md-12 fs16 m-t-10">
		           	<span style="font-weight:500; font-size:18px; color:#38a9ff;"> Sinergikita.id </span> adalah platform dibawah pengawasan Deputi Bidang Partisipasi Masyarakat Kementerian Pemberdayaan Perempuan dan Perlindungan Anak yang ditujukan bagi Lembaga Profesi, Dunia Usaha, Media, Organisasi Kemasyarakatan, Organisasi Keagamaan, Akademisi dan Lembaga Riset untuk saling bersinergi menangani isu perempuan dan anak
		            </div>
		            <div class="col-md-12 row c-w sosmed m-t-20">
		            	<a :href="facebook.url_sosmed" class="sosmed-f bg-g1"> <i class="fa fa-facebook fs28"></i> </a>
		            	<a :href="youtube.url_sosmed" class="sosmed-y bg-g1"> <i class="fa fa-youtube-play fs25"></i> </a>
		            	<a :href="twitter.url_sosmed" class="sosmed-t bg-g1"> <i class="fa fa-twitter fs28"></i> </a>
		            </div>
		          </div>
		        </div>
		        <div class="col-md-6 col-lg-5 col-sm-12 col-xs-12 row sosmed m-t-20">
		          <div class="col-md-12 row c-w">
		            <div class="col-md-12 fs20 c-g1">
		            Contact Us
		            </div>
		            <div class="col-md-12 col-sm-12 col-xs-12 row m-t-10 contact-section ">
		            	<div class="col-md-1 col-sm-1 col-xs-2">
			            	<a @click="coba" class="contact-l bg-g1">
			            		<i class="fa fa-map-pin fs14"></i> 
			            	</a>
			            </div>
			            <div class="col-md-11 col-sm-11 col-xs-9 c-grey1 fs16">
		            		<span> Jl. Medan Merdeka Barat No. 15, Jakarta 10110, Indonesia </span>
			            </div>
		            </div>
		            <div class="col-md-12 col-sm-12 col-xs-12 row smt10">
		            	<div class="col-md-1 col-sm-1 col-xs-2">
			            	<a @click="coba" class="contact-m bg-g1">
			            		<i class="fa fa-envelope fs14"></i> 
			            	</a>
			            </div>
			            <div class="col-md-11 col-sm-9 col-xs-9 c-grey1 fs16">
		            		<span> halo@sinergikita.id </span>
			            </div>
		            </div>
		            <div class="col-md-12 col-sm-12 col-xs-12 smt20 row">
		            	<div class="col-md-1 col-sm-1 col-xs-2">
			            	<a @click="coba" class="contact-c bg-g1">
			            		<i class="fa fa-phone fs16"></i> 
			            	</a>
			            </div>
			            <div class="col-md-11 col-sm-9 col-xs-9 c-grey1 fs16">
		            		<span> 021 3805541 <br/>021 3805563 Ext 4029</span>
			            </div>
		            </div>
		          </div>
		        </div>
		    </div>
	    </b-row>
	    <div style="border-top: 1px solid white; padding:0px 15px"></div>
	    <b-row class="text-center footer-list-bottom">
				<b-col class="container-footer"> &copy; 2019 Deputi Bidang Partisipasi Masyarakat KPPPA. <br/>All right reserved
				</b-col>
	    </b-row>
  	</b-container>
</template>
<script>
import axios from 'axios'
import { url } from '../url'
export default {
  	name: 'c-footer',
    axios,
    data ()	{
      return {
      	twitter: '',
      	youtube: '',
      	facebook: '',
      }
    },
	methods: { 
		index () {
			var self = this
	        var parameter = {
	        }
	        var config = { 
	          headers: {
	            'Content-Type': 'application/x-www-form-urlencoded'
	          }
	        }
	        axios.post(url.url_app + 'sosmed_filter', parameter, config).then(function (response) {
	          if (response.data.resultCode == 'OK') {
	            self.twitter = response.data.sosmed_list[1]
	            self.youtube = response.data.sosmed_list[0]
	            self.facebook = response.data.sosmed_list[2]
	          } else {
	            alert('SALAH...!')
	          }
	        })
		},
		coba () {
		}
	},
    created: function () {
      // this.index()
    }
}
</script>
