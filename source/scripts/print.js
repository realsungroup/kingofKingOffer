
       function doPrintOut2() {
     var str="";
                                //
                                 str+=" aassffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff "
                                 str+="   <table align='center'style='margin-top: 200px'>"
                   str+="     <tr>"
                   str+="     <td collapse='2' style='text-decoration: none;text-align:center'><strong>套装勿拆</strong></td>"
                   str+="       </tr>"
                   str+="       <tr>"
                   str+="       <td><strong>条形码:<strong></td>"
                   str+='<td id="code'+1+'">'
                   str+="      </tr>"
                   str+="      <tr>"
                   str+="      <td><strong>生产日期:<strong></td>"
                   str+="     <td>"+new Date().getFullYear()+"年"+new Date().getMonth()+"月"+new Date().getDate()+"日"+"</td>"
                   str+="      </tr>"
                   str+="  <tr>"
                   str+="  <td><strong>保质期:<strong></td>"
                   str+="   <td>"+11111+"个月"+"</td>"
                   str+="  </tr>"
                   str+="  <tr>"
                   str+="  <td><strong>产品名称:<strong></td>"
                   str+="  <td>"+222222+"</td>"
                   str+="  </tr>"
                   str+="     <table>"
                   str+="  <div class='pageBreak'>"
                   str+="</div>"
                                //
        //document.getElementById("print-content").append(str);
                               $("#print-content").append(str);
            window.print();
        };