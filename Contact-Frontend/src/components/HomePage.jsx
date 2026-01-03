import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HiMenu } from "react-icons/hi";
import { FiEdit2, FiTrash2, FiSave, FiX } from "react-icons/fi";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  /* ================= GET CONTACTS ================= */
  const getContactsHandler = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/contact/getContacts"
      );
      setContacts(res.data.data || []);
    } catch (error) {
      alert("Failed to fetch contacts");
    }
  };

  useEffect(() => {
    getContactsHandler();
  }, []);

  /* ================= ADD CONTACT ================= */
  const addContactHandler = async () => {
    navigate("/add-contact");
  };

  /* ================= EDIT ================= */
  const handleEditClick = (contact) => {
    setEditingId(contact._id);
    setEditForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
    });
  };

  const handleUpdateContact = async () => {
    let phone = editForm.phone;
    try {
      await axios.patch(
        `http://localhost:8000/api/v1/contact/${phone}`,
        { name: editForm.name }
      );

      setEditingId(null);
      getContactsHandler();
    } catch (error) {
      alert("Update failed");
    }
  };

  /* ================= DELETE ================= */
  const handleDeleteContact = async (identifier) => {
    if (!window.confirm("Delete this contact?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/v1/contact/${identifier}`);
      getContactsHandler();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* ================= TOP BAR ================= */}
      <div className="flex justify-between items-center px-6 py-4 bg-[#4337e6] text-white">
        <h1 className="text-xl font-semibold">Contact Management</h1>
        <HiMenu
          size={26}
          className="cursor-pointer"
          onClick={() => setMenuOpen(true)}
        />
      </div>

      {/* ================= CONTACT LIST ================= */}
      <div className="p-6 space-y-4">
        {contacts.length === 0 ? (
          <p className="text-center text-gray-500">No contacts found</p>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white rounded-lg shadow-md p-4
              grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
              {/* Name */}
              <div>
                <p className="text-xs text-gray-500">Name</p>
                {editingId === contact._id ? (
                  <input
                    className="border px-2 py-1 rounded w-full"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-medium">{contact.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{contact.email}</p>
              </div>

              {/* Phone */}
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium">{contact.phone}</p>
              </div>

              {/* Message */}
              <div>
                <p className="text-xs text-gray-500">Message</p>
                <p className="font-medium">{contact.message}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end">
                {editingId === contact._id ? (
                  <>
                    <FiSave
                      size={18}
                      className="cursor-pointer text-green-600"
                      onClick={handleUpdateContact}
                    />
                    <FiX
                      size={18}
                      className="cursor-pointer text-gray-500"
                      onClick={() => setEditingId(null)}
                    />
                  </>
                ) : (
                  <>
                    <FiEdit2
                      size={18}
                      className="cursor-pointer text-blue-600"
                      onClick={() => handleEditClick(contact)}
                    />
                    <FiTrash2
                      size={18}
                      className="cursor-pointer text-red-600"
                      onClick={() =>
                        handleDeleteContact(contact.phone || contact.email)
                      }
                    />
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= ADD CONTACT CARD ================= */}
      <div className="px-6 pb-6">
        <div
          onClick={addContactHandler}
          className="cursor-pointer bg-[#4337e6] text-white
          text-center py-4 rounded-xl shadow-lg
          font-semibold hover:opacity-90 transition">
          ADD CONTACT
        </div>
      </div>

      {/* ================= RIGHT SLIDE MENU ================= */}
      {/* <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl
        transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold text-lg text-[#4337e6]">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-500"
          >
            Close
          </button>
        </div>

        <ul className="p-4 space-y-4">
          <li className="cursor-pointer hover:text-[#4337e6]">Profile</li>
          <li className="cursor-pointer hover:text-[#4337e6]">Settings</li>
          <li className="cursor-pointer hover:text-[#4337e6]">Logout</li>
        </ul>
      </div> */}
    </div>
  );
}

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { HiMenu } from "react-icons/hi";
// import { useNavigate } from "react-router-dom";

// export default function HomePage() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [contacts, setContacts] = useState([]);
//   const navigate = useNavigate();

//   // 🔹 Fetch contacts on page load
//   const getContactsHandler = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/v1/contact/getContacts"
//       );

//       // assuming response.data.data = contacts array
//       setContacts(response.data.data);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to fetch contacts");
//     }
//   };

//   useEffect(() => {
//     getContactsHandler();
//   }, []);

//   // 🔹 Add contact using FormData
//   const addContactHandler = async () => {
//     navigate("/add-contact");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 relative">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-[#4337e6] text-white">
//         <h1 className="text-lg sm:text-xl font-semibold">Contact Management</h1>

//         <HiMenu
//           size={26}
//           className="cursor-pointer"
//           onClick={() => setMenuOpen(true)}
//         />
//       </div>

//       {/* Contact List */}
//       <div className="p-4 sm:p-6 space-y-4">
//         {contacts.length === 0 ? (
//           <p className="text-center text-gray-500">No contacts found</p>
//         ) : (
//           contacts.map((contact) => (
//             <div
//               key={contact._id}
//               className="bg-white rounded-lg shadow-md p-4
//                 grid grid-cols-1
//                 md:grid-cols-2
//                 lg:grid-cols-4
//                 gap-4">
//               <div>
//                 <p className="text-xs text-gray-500">Name</p>
//                 <p className="font-medium">{contact.name}</p>
//               </div>

//               <div>
//                 <p className="text-xs text-gray-500">Email</p>
//                 <p className="font-medium">{contact.email}</p>
//               </div>

//               <div>
//                 <p className="text-xs text-gray-500">Phone</p>
//                 <p className="font-medium">{contact.phone}</p>
//               </div>

//               <div>
//                 <p className="text-xs text-gray-500">Message</p>
//                 <p className="font-medium">{contact.message}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Add Contact Card */}
//       <div className="px-4 sm:px-6 pb-6">
//         <div
//           onClick={addContactHandler}
//           className="cursor-pointer bg-[#4337e6] text-white
//             text-center sm:py-4
//             rounded-xl shadow-lg
//             font-semibold tracking-wide
//             hover:opacity-90 transition">
//           ADD CONTACT
//         </div>
//       </div>

//       {/* Right Slide Context Menu
//       <div
//         className={`fixed top-0 right-0 h-full
//           w-64 sm:w-72
//           bg-white shadow-2xl
//           transform ${menuOpen ? "translate-x-0" : "translate-x-full"}
//           transition-transform duration-300 ease-in-out z-50`}>
//         <div className="p-4 border-b flex justify-between items-center">
//           <h2 className="font-semibold text-lg text-[#4337e6]">Menu</h2>
//           <button
//             onClick={() => setMenuOpen(false)}
//             className="text-gray-500 text-sm">
//             Close
//           </button>
//         </div>

//         <ul className="p-4 space-y-4">
//           <li className="cursor-pointer hover:text-[#4337e6]" onClick={addContactHandler}>Add Contact</li>
//           <li className="cursor-pointer hover:text-[#4337e6]">
//             Update Contact
//           </li>
//           <li className="cursor-pointer hover:text-[#4337e6]">
//             Delete Contact
//           </li>
//         </ul>
//       </div> */}
//     </div>
//   );
// }
