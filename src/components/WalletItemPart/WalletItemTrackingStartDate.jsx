export const WalletItemTrackingStartDate = ({ dateOfTrack }) => {
  return (
    <div className="flex items-center text-balance font-family-IranYekan-Bold text-[#B2B2B2]">
      {dateOfTrack
        ? `Tracking Started on ${new Date(dateOfTrack).toLocaleDateString(
            "en-CA"
          )}`
        : "No Tracking Date Available!"}
    </div>
  );
};
