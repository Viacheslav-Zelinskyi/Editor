const calculateTimeCost = require('./index')
const firstText = require('./exampleText')

test('Ukrainian or Russian', ()=>{
    expect(calculateTimeCost(firstText, 'example.doc', false, new Date('May 25, 2021 10:00:00'))).toEqual({Cost: 185.3, Date: "25-5-2021", Time: "13:30"})
})

test('Ukrainian or Russian minimal', ()=>{
    expect(calculateTimeCost("firstText", 'example.doc', false, new Date('May 25, 2021 10:00:00'))).toEqual({Cost: 50, Date: "25-5-2021", Time: "11:0"})
})

test('English minimal', ()=>{
    expect(calculateTimeCost("firstText", 'example.doc', true, new Date('May 25, 2021 10:00:00'))).toEqual({Cost: 120, Date: "25-5-2021", Time: "11:0"})
})

test('Another file type', ()=>{
    expect(calculateTimeCost(firstText, 'example.odt', true, new Date('May 25, 2021 10:00:00'))).toEqual({Cost: 533.66, Date: "26-5-2021", Time: "16:0"})
})

test('One day work', ()=>{
    expect(calculateTimeCost(firstText, 'example.doc', true, new Date('May 25, 2021 10:00:00'))).toEqual({Cost: 444.72, Date: "26-5-2021", Time: "13:0"})
})

test('Work after 19:00', ()=>{
    expect(calculateTimeCost(firstText, 'example.doc', true, new Date('May 25, 2021 19:00:00'))).toEqual({Cost: 444.72, Date: "27-5-2021", Time: "13:0"})
})

test('Work at the weekend', ()=>{
    expect(calculateTimeCost(firstText, 'example.dockx', true, new Date('May 29, 2021 10:00:00'))).toEqual({Cost: 444.72, Date: "1-6-2021", Time: "13:0"})
})

test('Work at the weekend after 19:00', ()=>{
    expect(calculateTimeCost(firstText, 'example.doc', true, new Date('May 29, 2021 19:00:00'))).toEqual({Cost: 444.72, Date: "1-6-2021", Time: "13:0"})
})