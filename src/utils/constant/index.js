const responsesError = {
    AllFieldsRequired:"Missing required fields: modelNumber, capacity, companyName, country",
    ModelNumberMissing:"Model Number not found oncoming request in the correct form",
    RegisterWentWrong:'Something went wrong while registering airplane',
    AirPlanesNotFound:'Sorry there is no Airplanes Found',
    isActiveAirplanes:"No Active Airplanes",
    MinCapacity:'minCapacity must be a number',
    MaxCapacity:'maxCapacity must be a number',
    InActiveAirplanes:`No inactive airplanes found`,
    InActiveAirplanesFailed:'Failed to fetch inactive airplanes',
    ActivePlanes: `No active airplanes found`,
    FailedToFetchActiveAirplanes:'Failed to fetch active airplanes',
    NoAiroplanesFound:"No airplane found to update",
    CanNotDeleteAiroplanes:"Cannot delete all airplanes",
    CanNotFetchAllAiroplanes:'cannot fetch data of all the airplanes',
    successMessage:"Airplane created successfully.",
    FailedMessage:"Airplane registration failed.",
    FetchedSuccessfully:"Airplanes fetched successfully.",
    FailedFetch:"Failed to Fetch Airoplaned",
    updateMessage:["Airplane updated successfully.","Error updating airplanes","Failed to update airplane."],
    deleteMessage:["Airplane deleted successfully.","Failed to delete airplane.","Failed to delete all airplanes."],
    activeAirplanesMessage:["Active airplanes fetched successfully","Failed to fetch active airplanes."],
    InActiveAirplanesMessage:["Inactive airplanes fetched successfully","Failed to fetch inactive airplanes."],
}

module.exports={
    responsesError
}