const vm = new Vue({
    data: function() {
        return {
            switch_isOn: {
                plus: true,
                division: false,
                multiplication: false
            },
            count: {
                current: 0,
                all_count: 0
            },
            drawer: {
                drawer: false,
                direction: "ltr",
            },
            // is_computing: false,
            limit: [-10, 10], // 每一操作数生成的数字范围
            num: 10,//操作数
            cal_result: "", // 计算结果
            oper: ["+", "-", "*", "/"],
            max_opear: 5, // 最大操作数
            oper_nums: [],
            oper_char: [],

            
        }
    },
    // computed: {
    //     character: function() {
    //         return this.rand(0, 3);
    //     },
    //     // // 操作数
    //     // oper_nums: {
    //     //     get() {
    //     //         this.__opear_nums = this.generate_nums();
    //     //         // return this.__opear_nums;
    //     //     },
    //     //     set(new_value) {
    //     //         this.__opear_nums = new_value;
    //     //     }
    //     // },
    //     // // 操作符
    //     // oper_char: {
    //     //     get(){
    //     //         this.__opear_chars = this.generate_char()
    //     //         // return this.b;
    //     //     },
    //     //     set(new_value){
    //     //         this.__opear_chars = new_value;
    //     //     }
    //     // }

    // },
    methods: {
        rand: function(n, m){
            return Math.floor(Math.random() * (m - n + 1)) + n;
        },
        verification: function(res){
            const content = this.$refs.comput.innerText
            
            let result = eval(content);
            
            if(result == res) {
                this.$message({
                    // title: '成功',
                    message: `恭喜你答对了, 答案就是：${result}`,
                    type: 'success',
                    duration:  1500
                });
                // 成功就重新设置
                this.restart_generate();
                this.count.current += 1;
            }else {
                this.$message({
                    // title: '错误',
                    message: '不太对哦！再试一下吧！',
                    type: 'warning',
                    duration: 1500
                });
                this.count.all_count += 1;
            }
            this.cal_result = "";
            this.$refs.input.focus();

        },
        // 生成4个随机数作为算子
        generate_nums: function(max_opear=this.max_opear) {
            let range = this.limit;
            let nums = [];
            for(let i = 0; i < max_opear; i++){
                nums[i] = this.rand(range[0], range[1]); // 1-100的算子
            }
            return nums;
        },
        // 生成一个操作数+-*/
        generate_char: function(generate_list) {
            let lis;
            if(generate_list != undefined)
                lis = generate_list
            else
                lis = this.oper

            let chars = [];
            for(let i = 0; i < this.max_opear - 1;i++) {
                chars[i] = lis[this.rand(0, lis.length-1)];
            }
            // chars.push("  ");
            
            return chars;
        },
        restart_generate: function() {
            let require = new Array();
            if(this.switch_isOn.plus) require.push("+"), require.push("-")
            if(this.switch_isOn.division) require.push("/")
            if(this.switch_isOn.multiplication) require.push("*")

            
            this.oper_nums = this.generate_nums();
            this.oper_char = this.generate_char(require);
            setTimeout(()=>{
                const compu = this.$refs.comput.innerText;
                if(eval(compu) != Math.ceil(eval(compu) && eval(compu) != Infinity))
                    // this.is_computing = true;
                    this.restart_generate();

            }, 1)
            // this.$refs.input.focus();
            // if(eval(compu) != parseInt(eval(compu))){
            //     // console.log(eval(compu));
            //     this.restart_generate();
            // }

        },
        number_change: function() {
            this.limit = [this.limit[0], this.num];
        }
    },
    mounted(){
        this.restart_generate();
        // this.oper_char = this.generate_char();
    }
})

vm.$mount("#app");