const{test , expect } = require('@playwright/test')

test.only("new test" ,async ({page})=>{ 

    console.log("my second test");
})

test("Test2", async ({page})=>{

    console.log("second  testcases")
    expect(10).toBe(12);
})
