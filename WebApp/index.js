const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const port = 3000

app.use(express.static('.'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/cal/:cal' ,(req, res) => {

    const operRegex = /[+\-*]/;
    cal = req.params['cal'].split(operRegex)

    a = cal[0]
    b = cal[1]

    operator = req.params['cal'].replace(a,'').replace(b,'')
    let msg = ''
    var txt = ''

    const promise = new Promise((resolve, reject)=>{
        if (b == '0' && operator == 'r') {
            reject('divide by zero')
        }
        else {
            c = calculator(a, b ,operator)
            operator = operator == 'r' ? '/' : operator
            msg = a + ' ' + operator + ' ' + b + ' = ' + c
            resolve(msg)
        }
    })

    promise.then(
        result => {
            txt = result
            console.log(result)
            res.send(result)
        }, error => {
            txt = 'Found error'
        })

    promise.catch(error => {
        txt += ', Exception:' + error
        console.error(txt)
        res.send(txt)
    })
})


calculator = (a, b, operator) => {
    a = parseFloat(a)
    b = parseFloat(b)

    switch (operator) {
        case '+':
            return a + b
        case '-':
            return a - b
        case '*':
            return a * b
        case 'r':
            return a / b
        default:
            return 'Invalid operator'
    }
}


app.get('/time', (req, res) => {
    dt = new Date()
    h = dt.getHours()
    m = dt.getMinutes()
    s = dt.getSeconds()
    
    res.send(h + ":" + m + ":" + s)
})

app.get('/', (req, res)=>{
    res.sendFile(`index.html`)
})

app.listen(port, ()=>{
    console.log(`Listening at http://localhost:${port}`)
})