//Вохмянин Александр А-08-20
import './App.css';
import axios from 'axios';
import React,{Component} from 'react';
  
class App extends Component {
   
    state = {
  
      // Изначально файл не выбран
      selectedFile: null
    };
     
    // При выборе файла
    onFileChange = event => {
     
      // Обновляем состояние
      this.setState({ selectedFile: event.target.files[0] });
     
    };
     
    // При нажатии кнопки загрузки
    onFileUpload = () => {
     
      // Создаем formdata объект
      const formData = new FormData();
     
      // Заносим файл в formdata объект
      formData.append(
        "data",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
     
      // Выводим данные о файле в консоль f12
      console.log([...formData]);
     
      // Запрос, сделанный к внутреннему api (бэкенду)
      // Отправляем (POST) полученный файл
      axios.post('/api/uploadfile', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(function () {
      console.log('успех');
    })
    .catch(function () {
      console.log('провал :(');
    });
    };
     
    // Содержимое файла, которое будет отображаться после завершения загрузки
    fileData = () => {
     
      if (this.state.selectedFile) {
          
        return (
          <div className="App">
            <h2>Данные о файле:</h2>
            <p>Название файла: {this.state.selectedFile.name}</p>
  
            <p>Тип файла: {this.state.selectedFile.type}</p>
  
            <p>
              Дата модификации:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
  
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>Выберите файл перед загрузкой</h4>
          </div>
        );
      }
    };
     
    render() {
     
      return (
        <div className="App">
            <h1 className="App-header">
              Вохмянин Александр | А-08-20
            </h1>
            <h3>
              Веб-интерфейс загрузки файлов с использованием ReactJS
            </h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Загрузить
                </button>
            </div>
          {this.fileData()}
        </div>
      );
    }
  }
  export default App;