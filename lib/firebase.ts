import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
	apiKey: 'AIzaSyCuBY3NG-awPUIs-da-adQjcxSmqjZ24-c',
	authDomain: 'praktikum-3319a.firebaseapp.com',
	projectId: 'praktikum-3319a',
	storageBucket: 'praktikum-3319a.appspot.com',
	messagingSenderId: '193450309570',
	appId: '1:193450309570:web:8a35559b6dd3ed067a885b',
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage }
