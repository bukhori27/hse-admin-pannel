export const Texting = {
	data () {
		return {
		  	title1: '',
		  	title2: '',
		  	title3: '',
		  	title4: '',
		  	title5: '',
			title6: '',
			title7: '',
			title8: '',
			title9: '',
		}
	},
	methods: {
	    setText () {
			this.title1 = "Uraikan fakta dan situasi sebelum inovasi dimulai, sertakan dengan data sebagai pendukung. " + 
			"Kelompok perempuan dan anak mana saja yang terpengaruh misalnya kelompok ibu rumah tangga (female house hold), kelompok perempuan penyandang disabilitas," +
			"anak-anak berkebutuhan khusus (abk), anak-anak korban kekerasan seksual, anak-anak korban eksploitasi (tenaga kerja anak), anak-anak korban penyalahgunaan" +
			"narkotika, anak-anak korban bullying, anak-anak korban perceraian orang tua, anak-anak korban gadget; dan dalam hal apa?" + 
			"Sebutkan masalah utama yang perlu diselesaikan. Jawaban disampaikan paling banyak dalam 500 kata. ";
			this.title2 = "Jelaskan bahwa inovasi yang diajukan terbilang unik dan mampu menyelesaikan masalah dengan cara-cara baru " +
			"dan berbeda dengan metode sebelumnya serta telah berhasil diimplementasikan. Jawaban disampaikan paling banyak dalam 200 kata."
			this.title3 = "Jelaskan dengan rinci unsur-unsur rencana aksi yang pernah dikembangkan untuk melaksanakan inovasi termasuk perkembangan dan langkah-langkah kunci, kegiatan-kegiatan utama serta kronologinya." +
			"Jawaban disampaikan paling banyak dalam 600 kata.";
			this.title4 = "Uraikan sumber daya keuangan, teknis, manusia, dan lain-lain yang ada kaitannya dengan inovasi." +
			"Bilamana ada, uraikan" +
			"mekanisme pengelolaan sumber daya yang lain, misalnya pola kemitraan, swadaya masyarakat," + 
			"CSR, dan sebagainya. Jawaban disampaikan paling banyak dalam 500 kata.";
			this.title5 = "Sebutkan paling banyak lima keluaran " + 
			"kongkrit yang mendukung keberhasilan inovasi. Jawaban disampaikan paling banyak dalam 400 kata.";
			this.title6 = "Jelaskan bagaimana pelaksanaan inovasi dapat dipantau dan dilakukan evaluasi. Jawaban disampaikan paling banyak dalam 400 kata.";
			this.title7 = "Uraikan masalah utama yang dihadapi selama pelaksanaan inovasi dan bagaimana cara penanggulangan " + 
			"berikut penyelesaiannya. Jawaban disampaikan paling banyak dalam 300 kata.";
			this.title8 = "Uraikan dampak dari inovasi sertakan bukti berupa data yang relevan. Jawaban disampaikan paling banyak dalam 700 kata.";
			this.title9 = "Uraikan bagaimana inovasi ini berkesinambungan dan mendapat jaminan serta dukungan dari segi keuangan, sosial dan ekonomi, budaya," +
			"lingkungan, kelembagaan, serta peraturan." +
			"Jawaban disampaikan paling banyak dalam 500 kata.";

		}
	},
  	created () {
  		this.setText()
  	}
}
