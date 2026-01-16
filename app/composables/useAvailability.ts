export const useAvailability = (availabilityDate: Date | null) => {
  const isAvailable = computed(() => {
    return availabilityDate && availabilityDate < new Date();
  });

  const backgroundColor = computed(() => {
    return getValueFromAvailability({
      available: "bg-green-500",
      availableDate: "bg-orange-500",
    });
  });

  const statusTextKey = computed(() => {
    return getValueFromAvailability({
      available: "layout.topbar.availability.available",
      availableDate: "layout.topbar.availability.available-from",
    });
  });

  const getValueFromAvailability = <T>(values: {
    available: T;
    availableDate: T;
  }): T | undefined => {
    if (isAvailable.value) {
      return values.available;
    } else if (availabilityDate) {
      return values.availableDate;
    }
  };

  return {
    isAvailable,
    backgroundColor,
    statusTextKey,
  };
};
