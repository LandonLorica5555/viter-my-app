import React from "react";
import ModalWrapper from "../../../../partials/modal/ModalWrapper";
import { FaTimes } from "react-icons/fa";
import { Form, Formik } from "formik";
import { InputText, InputTextArea } from "../../../../helpers/FormInputs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../custom-hooks/queryData";
import * as Yup from "yup";
import { apiVersion } from "../../../../helpers/function-general";

const ModalAddTestimonials = ({ setIsModal, itemEdit }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developer/testimonials/testimonials.php?id=${itemEdit.testimonials_aid}`
          : `${apiVersion}/controllers/developer/testimonials/testimonials.php`,
        itemEdit
          ? "put" // UPDATE
          : "post", // CREATE
        values
      ),
    onSuccess: (data) => {
      // validate reading
      queryClient.invalidateQueries({ queryKey: ["testimonials"] }); // give id for refetching data.

      if (!data.success) {
        window.prompt(data.error);
      } else {
        window.prompt(
          itemEdit ? `Successfully edited.` : `Successfully created.`
        );
        setIsModal(false);
      }
    },
  });

  const handleClose = () => {
    if (mutation.isPending) return; // dont close while query is ongoing
    setAnimate("translate-x-full"); // DELAY OF CLOSING MODAL
    setTimeout(() => {
      setIsModal(false); // close upon animation exit
    }, 200);
  };

  const initVal = {
    testimonials_image: itemEdit ? itemEdit.testimonials_image : "",
    testimonials_description: itemEdit ? itemEdit.testimonials_description : "",
    testimonials_name: itemEdit ? itemEdit.testimonials_name : "",
    testimonials_position: itemEdit ? itemEdit.testimonials_position : "",
  };

  const yupSchema = Yup.object({
    testimonials_image: Yup.string().required("required"),
    testimonials_description: Yup.string().required("required"),
    testimonials_name: Yup.string().required("required"),
    testimonials_position: Yup.string().required("required"),
  });

  // UPON USING THIS MODAL AND ALL ELEMENT TAG ARE RENDERED, RUN THIS CODE
  React.useEffect(() => {
    setAnimate("");
  }, []); // [] is dependencies. if you have a value inside re-run the code inside

  return (
    <ModalWrapper className={animate} handleClose={handleClose}>
      <div className="modal_header relative mb-4">
        <h3 className="text-sm">{itemEdit ? "Edit" : "Add"} Testimonials</h3>
        <button
          type="button"
          className="absolute top-0.5 right-0"
          onClick={handleClose}
        >
          <FaTimes className="size-4" />
        </button>
      </div>
      <div className="modal_body overflow-y-auto overflow-x-hidden max-h-[calc(100dvh-40px)]">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            console.log(values);
            mutation.mutate(values);
          }}
        >
          {(props) => {
            return (
              <Form>
                {/* Forms */}
                <div className="modal-overflow">
                  <div className="relative mt-5 mb-6">
                    <InputText
                      label="Image Link"
                      name="testimonials_image"
                      type="text"
                    />
                  </div>
                  <div className="relative mt-5 mb-6">
                    <InputTextArea
                      label="Description"
                      name="testimonials_description"
                      type="text"
                    />
                  </div>
                  <div className="relative mt-5 mb-6">
                    <InputText
                      label="Name"
                      name="testimonials_name"
                      type="text"
                    />
                  </div>
                  <div className="relative mt-5 mb-6">
                    <InputText
                      label="Position"
                      name="testimonials_position"
                      type="text"
                    />
                  </div>
                </div>
                <div className="modal__action flex justify-end absolute w-full bottom-0 mt-6 mb-4 gap-2 left-0 px-6">
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="btn-modal-submit"
                  >
                    {mutation.isPending
                      ? "Loading..."
                      : itemEdit
                      ? "Save"
                      : "Add"}
                  </button>
                  <button
                    type="reset"
                    disabled={mutation.isPending}
                    className="btn-modal-cancel"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </ModalWrapper>
  );
};

export default ModalAddTestimonials;
