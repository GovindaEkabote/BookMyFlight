const responsesError = {
  AllFieldsRequired:
    "Missing required fields: modelNumber, capacity, companyName, country",
  ModelNumberMissing:
    "Model Number not found oncoming request in the correct form",
  RegisterWentWrong: "Something went wrong while registering airplane",
  AirPlanesNotFound: "Sorry there is no Airplanes Found",
  isActiveAirplanes: "No Active Airplanes",
  MinCapacity: "minCapacity must be a number",
  MaxCapacity: "maxCapacity must be a number",
  InActiveAirplanes: `No inactive airplanes found`,
  InActiveAirplanesFailed: "Failed to fetch inactive airplanes",
  ActivePlanes: `No active airplanes found`,
  FailedToFetchActiveAirplanes: "Failed to fetch active airplanes",
  NoAiroplanesFound: "No airplane found to update",
  CanNotDeleteAiroplanes: "Cannot delete all airplanes",
  CanNotFetchAllAiroplanes: "cannot fetch data of all the airplanes",
  successMessage: "Airplane created successfully.",
  FailedMessage: "Airplane registration failed.",
  FetchedSuccessfully: "Airplanes fetched successfully.",
  FailedFetch: "Failed to Fetch Airoplaned",
  updateMessage: [
    "Airplane updated successfully.",
    "Error updating airplanes",
    "Failed to update airplane.",
  ],
  deleteMessage: [
    "Airplane deleted successfully.",
    "Failed to delete airplane.",
    "Failed to delete all airplanes.",
  ],
  activeAirplanesMessage: [
    "Active airplanes fetched successfully",
    "Failed to fetch active airplanes.",
  ],
  InActiveAirplanesMessage: [
    "Inactive airplanes fetched successfully",
    "Failed to fetch inactive airplanes.",
  ],
  getAirPlaneManufactureMessage: [
    "Airplanes fetched successfully.",
    "manufacturer not found",
    "Manufacturer parameter is required",
    "No airplanes found for the specified manufacturer",
  ],
  bulkCreateAirplaneMessage: [
    "Aircrafts created successfully",
    "Error creating aircrafts",
    "Aircrafts array is required",
    "No aircraft data provided",
    "Duplicate registration numbers in request",
    "Some registration numbers already exist",
    "Failed to create aircrafts",
  ],
  validateBulkUpdateMessage: [
    "Aircrafts array is required and must be an array",
    "Each aircraft must have id, modelNumber, manufacturer, registerationNumber, and seat counts",
    "Registeration number must be alphanumeric with optional hyphens",
    "Seat counts cannot be negative",
  ],
  bulkUpdateAirplaneMessage: [
    "Aircrafts updated successfully",
    "Aircrafts updated successfully",
    "Error updating aircrafts",
  ],
  getPendingMaintenance: [
    "Successfully fetched maintenance records",
    "Failed to fetch pending maintenance records",
    "Failed to fetch pending maintenance records",
  ],
  MaintenanceMiddleware: ["Missing required maintenance fields"],
  getAirplanesByStatus: [
    "Successfully fetched maintenance records",
    "Something went wrong in MaintenanceController.get",
  ],
  maintanance: [
    "Successfully fetched maintenance records",
    "Something went wrong in MaintenanceController.get",
    "Maintenance record created successfully.",
    "Something went wrong in MaintenanceController",
  ],
};

module.exports = {
  responsesError,
};
