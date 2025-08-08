import { Component } from 'react';
import QRCode from 'qrcode';
import './App.css'

class App extends Component {
  state = {
    inputUrl: '',
    qrUrl: '', colorIs:''
  };

  onChangeUrl = (e) => {
    this.setState({ inputUrl: e.target.value });
  };

  getQr = async () => {
    const { inputUrl, colorIs } = this.state;

    try {
      const qrDataUrl = await QRCode.toDataURL(inputUrl , {
        color:{dark:colorIs ||  '#000000'}
      });
      this.setState({ qrUrl: qrDataUrl });
    } catch (err) {
      console.error('Failed to generate QR code:', err);
    }
  };

  colorChange=(e)=>{
    this.setState({colorIs: e.target.value})
  }
  downloadQr = () => {
    const { qrUrl } = this.state;
    if (!qrUrl) return;
    
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'QRCode.png';
    link.click();
  };
  render() {
    const { inputUrl, qrUrl , colorIs} = this.state;
console.log(colorIs)
    return (
      <dvi className='card'>
        <div className='bg-card'>
          <h1 className='head'>QR Generator</h1>
          <input
            type='text'
            placeholder='Enter Your URL'
            value={inputUrl}
            onChange={this.onChangeUrl}
            className='input'
          />
          <div className='btn-container'>
            <button className='button' onClick={this.getQr}>Get QR Code</button>
            <input className='color' type='color' onChange={this.colorChange} value={colorIs}/>
          </div>
          <div className='qr-card'>
            {qrUrl ? (<>
              <img src={qrUrl} alt="Generated QR Code" 
              style={{ backgroundColor: 'red',}}
              />
              <button className='download-btn' onClick={this.downloadQr}>Download QR</button>
            </>):null
            }
            
          </div>
        </div>
      </dvi>
    );
  }
}

export default App;
