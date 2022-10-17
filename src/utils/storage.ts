export const loadState = (key: string, typeOfValue?: any) => {
	try {
		if (typeof window !== "undefined") {
			const serializedState = localStorage.getItem(key);
			const serializedTempState = sessionStorage.getItem(key);
			if (serializedTempState) {
				return JSON.parse(serializedTempState);
			}
			if (!serializedState) {
				return undefined;
			} else {
				return JSON.parse(serializedState) ?? typeOfValue;
			}
		}
	} catch (e) {
		return undefined;
	}
};

export const saveState = async (key: string, state: any, isTemporary?: boolean) => {
	try {
		if (typeof window !== "undefined") {
			const serializedState = JSON.stringify(state);
			if (isTemporary) {
				sessionStorage.setItem(key, serializedState);
			} else {
				localStorage.setItem(key, serializedState);
			}
		}
	} catch (e) { }
};
