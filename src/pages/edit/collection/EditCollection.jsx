import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useAuthHandler } from "@/handlers/AuthHandler";
import { useAuth } from "@/context/AuthProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { COLLECTION_ENDPOINTS } from "@/handlers/Endpoints";
import { DeleteCollectionDialog } from "@/pages/marketplace/collections/components/CollectionCard";
import { USER_ENDPOINTS } from "../../../handlers/Endpoints";

function EditCollection() {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuth } = useAuth();
  const { fetchWithAuth } = useAuthHandler();

  if (!isAuth) {
    toast.error("Please login to edit collections");
    navigate("/");
  }

  const {
    data: collectionData,
    error: collectionError,
    isLoading: collectionLoading,
  } = useQuery(
    "collection-about",
    () =>
      fetchWithAuth(COLLECTION_ENDPOINTS.ABOUT.replace(":id", collectionId)),
    {
      enabled: !!collectionId,
      retry: 1,
      onError: (error) => {
        console.error("Failed to fetch collection details:", error);
      },
    }
  );
  const [collection, setCollection] = useState({
    name: collectionData?.data?.name || "",
    description: collectionData?.data?.description || "",
  });

  useEffect(() => {
    if (collectionData?.data) {
      setCollection((prev) => ({
        ...prev,
        name: collectionData.data.name || "",
        description: collectionData.data.description || "",
      }));
    }
  }, [collectionData]);

  const handleNameChange = (e) => {
    setCollection({ ...collection, name: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setCollection({ ...collection, description: e.target.value });
  };

  const handleEditCollection = async () => {
    if (!collection || !collection.name || !collection.description) {
      toast.error("Please fill all the fields");
      return;
    }

    setIsLoading(true);

    try {
      // Send updated collection data to the backend
      const response = await fetchWithAuth(USER_ENDPOINTS.EDIT_COLLECTION, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collection),
      });

      if (response.success !== true) {
        const data = await response.json();
        console.error("Error updating collection:", data);
        toast.error(
          data.message || "An error occurred while updating the collection"
        );
        return;
      }

      toast.success("Collection updated successfully");
    } catch (error) {
      console.error("Error updating collection:", error);
      toast.error(
        error.message || "An error occurred while updating the collection"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen my-20 mx-56 ">
        <h1 className="text-primary-foreground text-6xl font-bold mb-10">
          Edit Collection
        </h1>
        <div className="space-y-20">
          {/* Collection information */}
          {/* Name */}
          <div className="flex flex-col gap-4">
            <span className="text-primary-foreground text-3xl font-bold">
              Name <span className="text-destructive">*</span>
            </span>
            <Input
              placeholder="Name your collection"
              id="name"
              value={collection.name}
              onChange={handleNameChange}
              className={`pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]
                  ${
                    !collection.name
                      ? "border-2 border-destructive"
                      : "border-2 border-primary"
                  }
                  `}
            />
          </div>

          {/* Description */}
          <div className="space-y-4">
            <span className="text-primary-foreground text-3xl font-bold">
              Description
            </span>
            <Input
              placeholder="Enter a description"
              id="description"
              value={collection.description}
              onChange={handleDescriptionChange}
              className={`pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]
                ${
                  !collection.description
                    ? "border-2 border-destructive"
                    : "border-2 border-primary"
                }
                `}
            />
          </div>

          {/* Update button */}
          <div className="space-x-4">
            <Button
              size="xl"
              className="text-black bg-primary-foreground p-8 text-xl"
              onClick={handleEditCollection}
              disabled={isLoading}
            >
              Update Collection
            </Button>
            <DeleteCollectionDialog collectionId={collectionId}>
              <Button
                size="xl"
                className=" bg-destructive p-8 text-xl"
                disabled={isLoading}
              >
                Delete Collection
              </Button>
            </DeleteCollectionDialog>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditCollection;
