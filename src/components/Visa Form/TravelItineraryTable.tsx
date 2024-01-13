"use client";
import { Button, Drawer, DrawerProps, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CustomModal from "../../utils/CustomModel";
import CountriesEditForm from "./CountriesEditForm";
import TravelItinerary from "./TravelItinerary";

interface DataType {
  key: number;
  title: string;
  description: string;
  country: string;
}

interface TravelItinerary {
  key: string;
  id: number;
  title: string;
  description: string;
  countryid: number;
}

interface Country {
  id: number;
  title: string;
}

const TravelItineraryTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");
  const [formType, setFormType] = useState<"edit" | "add" | null>(null);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Selected ID:", selectedId);
      try {
        const countriesResponse = await axios.get("/api/visaapi/countries");
        const countriesData = countriesResponse.data.countries;
        const VisaRequirementsResponse = await axios.get(
          "/api/visaapi/travelitinerary"
        );
        const VisaRequirementsData =
          VisaRequirementsResponse.data.travelItinerary;

        const transformedData = VisaRequirementsData.map(
          (travelitinerary: TravelItinerary) => {
            const Title = countriesData.find(
              (country: Country) => country.id === travelitinerary.countryid
            );
            return {
              key: travelitinerary.id,
              title: travelitinerary.title,
              description: travelitinerary.description,
              country: Title ? [Title.title] : [],
            };
          }
        );
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedId]);

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    console.log("Confirmed delete for:", selectedId);
    // Add your delete logic here
    await axios.delete(`/api/visaapi/countries/${selectedId}`);
    setIsModalOpen(false);
    router.push("/VisaFormPage/CountriesFormTable");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = (id: number) => {
    setSelectedId(id);
    setFormType("edit");
    showDrawer();
  };

  const handleAddClick = () => {
    setFormType("add");
    showDrawer();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (text) => <a className="p-3">{text}</a>,
    },
    {
      title: "Address",
      dataIndex: "description",
      key: "description",
      // render: (details) => <div className="line-clamp-1">{details}</div>,
    },
    {
      title: "country",
      key: "country",
      dataIndex: "country",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: DataType) => (
        <Space size="middle" direction="vertical">
          {/* Bottom two buttons */}
          <Space size="middle">
            <Button
              type="primary"
              className="bg-green-700"
              onClick={() => handleEditClick(record.key)}
            >
              Edit
            </Button>
            <Button
              type="primary"
              className="bg-red-700"
              onClick={() => handleDeleteClick(record.key)}
            >
              Delete
            </Button>
          </Space>
        </Space>
      ),
    },
  ];

  return (
    <>
      <section className="dark:bg-gray-900 flex items-center">
        <div className=" w-full">
          <div className="relative bg-white dark:bg-gray-800 sm:rounded-lg">
            <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  onClick={() => handleAddClick()}
                >
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Table
        columns={columns}
        dataSource={data}
        bordered={true}
        className="mx-3 overflow-x-scroll"
      />{" "}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      <Drawer
        title={formType === "edit" ? "Edit Country" : "Add Country"}
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
        width={600}
      >
        {formType === "edit" && <CountriesEditForm id={selectedId} />}
        {formType === "add" && <TravelItinerary />}
      </Drawer>
    </>
  );
};

export default TravelItineraryTable;
