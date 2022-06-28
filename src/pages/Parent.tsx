import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Child from "./Child";
type Props = {};
const data = JSON.parse(
  `{"items":[{"layout":[{"template":{"type":"l","label":"Delivery Order","alter":"แบบฟอร์มใบส่งของ","istext":"N","textvalue":"","attribute":null},"data":{"value":null}}]},{"layout":[{"template":{"type":"t","label":"Customer","alter":"ลูกค้า","attribute":{"require":"N","description":"","length":"","default":"","readonly":"N"}},"data":{"value":null}},{"template":{"type":"d","label":"Due Date","alter":"วันครบกำหนด","attribute":{"require":"N","description":"","readonly":"N","date":{"use":"Y","useDate":"Y","fullYear":"Y","symbol":""},"time":{"use":"N","useSecond":"Y","symbol":":"}}},"data":{"value":"28/Jun/2022"}}]},{"layout":[{"template":{"type":"ta","label":"Address","alter":"ที่อยู่จัดส่ง","attribute":{"require":"N","description":"","length":"","default":"","summary":"N","readonly":"N"}},"data":{"value":null}},{"template":{"type":"t","label":"Reference","alter":"เลขที่อ้างอิง","attribute":{"require":"N","description":"","length":"","default":"","readonly":"N"}},"data":{"value":null}}]},{"layout":[{"template":{"type":"t","label":"Tax ID","alter":"เลขประจำตัวผู้เสียภาษี","attribute":{"require":"N","description":"","length":"","default":"","readonly":"N"}},"data":{"value":null}},{"template":{"type":"t","label":"Attn","alter":"ผู้ติดต่อ","attribute":{"require":"N","description":"","length":"","default":"","readonly":"N"}},"data":{"value":null}}]},{"layout":[{"template":{"type":"tb","label":"","alter":"","formula":"Quantity*Unit Price=Amount","attribute":{"column":[{"label":"Description","alter":"รายการ","control":{"template":{"type":"t","label":"Description","alter":"รายการ","attribute":{"require":"N","description":"","length":"","default":"","readonly":"N"}},"data":{"value":null}}},{"label":"Quantity","alter":"จำนวน","control":{"template":{"type":"c","label":"Quantity","alter":"จำนวน","attribute":{"require":"N","formula":"","description":"","decimal":"2","default":"","align":"r","min":"","max":"","useComma":"Y","symbol":"","symbolPosition":"E","summary":"N","readonly":"N"}},"data":{"value":null}}},{"label":"Unit Price","alter":"ราคาต่อหน่วย","control":{"template":{"type":"c","label":"Unit Price","alter":"ราคาต่อหน่วย","attribute":{"require":"N","formula":"","description":"","decimal":"2","default":"","align":"r","min":"","max":"","useComma":"Y","symbol":"","symbolPosition":"E","summary":"N","readonly":"N"}},"data":{"value":null}}},{"label":"Amount","alter":"จำนวนเงิน","control":{"template":{"type":"c","label":"Amount","alter":"จำนวนเงิน","attribute":{"require":"N","formula":"","description":"","decimal":"2","default":"","align":"r","min":"","max":"","useComma":"Y","symbol":"","symbolPosition":"E","summary":"Y","readonly":"N"}},"data":{"value":null}}}],"enabledpopupdefdoc":"N","mergecolumnrefdoc":[{"ColumnLabel":"Description","RefDocLabel":""},{"ColumnLabel":"Quantity","RefDocLabel":""},{"ColumnLabel":"Unit Price","RefDocLabel":""},{"ColumnLabel":"Amount","RefDocLabel":""}],"conditionrefdoc":[],"autoRowNumber":"Y"}},"data":{"row":null}}]},{"layout":[{"template":{"type":"ta","label":"Remark","alter":"หมายเหตุ","attribute":{"require":"N","description":"","length":"","default":"","summary":"N","readonly":"N"}},"data":{"value":null}}]}]}`
);
const data2 = JSON.parse(
  `{"items":[{"layout":[{"template":{"type":"l","label":"Delivery Order","alter":"แบบฟอร์มใบส่งของ","istext":"N","textvalue":"","attribute":null},"data":{"value":null}}]},{"layout":[{"template":{"type":"t","label":"Customer","alter":"ลูกค้า","attribute":{"require":"N","description":"","length":"","default":"","readonly":"N"}},"data":{"value":null}},{"template":{"type":"d","label":"Due Date","alter":"วันครบกำหนด","attribute":{"require":"N","description":"","readonly":"N","date":{"use":"Y","useDate":"Y","fullYear":"Y","symbol":""},"time":{"use":"N","useSecond":"Y","symbol":":"}}},"data":{"value":"28/Jun/2022"}}]},{"layout":[{"template":{"type":"ta","label":"Address","alter":"ที่อยู่จัดส่ง","attribute":{"require":"N","description":"","length":"","default":"","summary":"N","readonly":"N"}},"data":{"value":null}},{"template":{"type":"t","label":"Reference","alter":"เลขที่อ้างอิง","attribute":{"require":"N","description":"","length":"","default":"","readonly":"N"}},"data":{"value":null}}]},{"layout":[{"template":{"type":"t","label":"Tax ID","alter":"เลขประจำตัวผู้เสียภาษี","attribute":{"require":"N","description":"","length":"","default":"","readonly":"N"}},"data":{"value":null}},{"template":{"type":"t","label":"Attn","alter":"ผู้ติดต่อ","attribute":{"require":"N","description":"","length":"","default":"","readonly":"N"}},"data":{"value":null}}]},{"layout":[{"template":{"type":"tb","label":"","alter":"","formula":"Quantity*Unit Price=Amount","attribute":{"column":[{"label":"Description","alter":"รายการ","control":{"template":{"type":"t","label":"Description","alter":"รายการ","attribute":{"require":"N","description":"","length":"","default":"","readonly":"N"}},"data":{"value":null}}},{"label":"Quantity","alter":"จำนวน","control":{"template":{"type":"c","label":"Quantity","alter":"จำนวน","attribute":{"require":"N","formula":"","description":"","decimal":"2","default":"","align":"r","min":"","max":"","useComma":"Y","symbol":"","symbolPosition":"E","summary":"N","readonly":"N"}},"data":{"value":null}}},{"label":"Unit Price","alter":"ราคาต่อหน่วย","control":{"template":{"type":"c","label":"Unit Price","alter":"ราคาต่อหน่วย","attribute":{"require":"N","formula":"","description":"","decimal":"2","default":"","align":"r","min":"","max":"","useComma":"Y","symbol":"","symbolPosition":"E","summary":"N","readonly":"N"}},"data":{"value":null}}},{"label":"Amount","alter":"จำนวนเงิน","control":{"template":{"type":"c","label":"Amount","alter":"จำนวนเงิน","attribute":{"require":"N","formula":"","description":"","decimal":"2","default":"","align":"r","min":"","max":"","useComma":"Y","symbol":"","symbolPosition":"E","summary":"Y","readonly":"N"}},"data":{"value":null}}}],"enabledpopupdefdoc":"N","mergecolumnrefdoc":[{"ColumnLabel":"Description","RefDocLabel":""},{"ColumnLabel":"Quantity","RefDocLabel":""},{"ColumnLabel":"Unit Price","RefDocLabel":""},{"ColumnLabel":"Amount","RefDocLabel":""}],"conditionrefdoc":[],"autoRowNumber":"Y"}},"data":{"row":[[{"value":""},{"value":"1.00"},{"value":"1.00"},{"value":"1.00"}]]}}]},{"layout":[{"template":{"type":"ta","label":"Remark","alter":"หมายเหตุ","attribute":{"require":"N","description":"","length":"","default":"","summary":"N","readonly":"N"}},"data":{"value":null}}]}]}`
);
const Parent = (props: Props) => {
  const [persons, setPersons] = useState<any[]>(data2.items);
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      items: persons,
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "items", // unique name for your Field Array
    }
  );
  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <div className="parent">
      {fields.map((person: any, nestedIdx: number) => (
        <Child
          key={person.id}
          person={person}
          control={control}
          nestedIdx={nestedIdx}
        />
      ))}
      <button onClick={() => console.log(persons)}>Click</button>

      {/* <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="checkbox"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Checkbox {...field} />}
      />
      <input type="submit" />
    </form> */}
    </div>
  );
};

export default Parent;
