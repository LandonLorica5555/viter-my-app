import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const TestimonialsTable = ({
  isLoading,
  isFetching,
  error,
  dataTestimonials,
  handleAdd,
  handleDelete,
  handleEdit,
}) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Position</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataTestimonials?.data.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}.</td>
                <td>{item.testimonials_name}</td>
                <td>{item.testimonials_position}</td>
                <td>{item.testimonials_description}</td>
                <td>
                  <div className="flex items-center justify-end gap-x-3 mr-5">
                    <button
                      type="button"
                      data-tooltip="Edit"
                      className="tooltip"
                      onClick={() => handleEdit(item)}
                    >
                      <FaPencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      data-tooltip="Delete"
                      className="tooltip"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TestimonialsTable;
