const { DeviceDiscovery, Sonos } = require('sonos')
const express = require('express')
const app = express()

// EJS
app.set('views', './views');
app.set('view engine', 'ejs');

//  Middlewares
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({
    extended: true
}))



app.get('/', function (req, res) {
  DeviceDiscovery((device) => {
    device.currentTrack().then(play => {
      device.getCurrentState().then(state => {
        device.getVolume().then(volume => {
          res.render('index', {play:play, state:state, volume:volume});
        })
        
      })
    })
  })
})


app.get('/pause', (req, res) => {
  DeviceDiscovery((device) => {
    device.pause().then(() => {
      DeviceDiscovery((device) => {
        device.currentTrack().then(play => {
          device.getCurrentState().then(state => {
            res.redirect('/');
          })
        })
      })
    })
  })
})


app.get('/play', (req, res) => {
  DeviceDiscovery((device) => {
    device.play().then(() => {
      DeviceDiscovery((device) => {
        device.currentTrack().then(play => {
          device.getCurrentState().then(state => {
            res.redirect('/');
          })
        })
      })
    })
  })
})

app.get('/next', (req, res) => {
  DeviceDiscovery((device) => {
    device.next().then(() => {
      DeviceDiscovery((device) => {
        device.currentTrack().then(play => {
          device.getCurrentState().then(state => {
            res.redirect('/');
          })
        })
      })
    })
  })
})


app.get('/previous', (req, res) => {
  DeviceDiscovery((device) => {
    device.previous().then(()=>{
      DeviceDiscovery((device) => {
        device.currentTrack().then(play => {
          device.getCurrentState().then(state => {
            res.redirect('/');
          })
        })
      })
    })
  })
})


app.listen(3000)