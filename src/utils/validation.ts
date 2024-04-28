import * as Yup from "yup";

//validation form
const infoOrderSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Lớn hơn 2 kí tự!")
      .max(50, "Tên quá dài!")
      .required("Vui lòng nhập họ và tên!"),
    phone: Yup.string()
      .min(10, "Không đúng định dạng!")
      .max(10, "Không đúng định dạng!")
      .required("Vui lòng nhập số điện thoại."),
    email: Yup.string()
      .email("Email không đúng định dạng.")
      .required("Vui lòng nhập email."),
});

export {
    infoOrderSchema,   
}