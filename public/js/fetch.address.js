function fetchProvinces() {
    // Gọi API để lấy dữ liệu tỉnh/thành phố
    fetch('http://jul2nd.ddns.net/address/provinces')
        .then(response => response.json())
        .then(data => {
            const provincesSelect = document.getElementById('provinces');

            // Xóa tất cả các option hiện có
            provincesSelect.innerHTML = '<option>Chọn tỉnh/thành phố</option>';

            // Thêm các option mới từ dữ liệu API
            data.forEach(province => {
                const option = document.createElement('option');
                option.value = province.code;
                option.text = province.full_name;
                provincesSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching provinces:', error));
}

function fetchDistricts() {
    const selectedProvinceCode = document.getElementById('provinces').value;

    // Gọi API để lấy dữ liệu quận/huyện dựa vào mã tỉnh đã chọn
    fetch('http://jul2nd.ddns.net/address/districts/' + selectedProvinceCode)
        .then(response => response.json())
        .then(data => {
            const districtsSelect = document.getElementById('districts');

            // Xóa tất cả các option hiện có
            districtsSelect.innerHTML = '<option>Chọn quận/huyện</option>';

            // Thêm các option mới từ dữ liệu API
            data.forEach(district => {
                const option = document.createElement('option');
                option.value = district.code;
                option.text = district.full_name;
                districtsSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching districts:', error));
}

function fetchWards() {
    const selectedDistrictCode = document.getElementById('districts').value;

    // Gọi API để lấy dữ liệu phường/xã dựa vào mã quận/huyện đã chọn
    fetch(`http://jul2nd.ddns.net/address/wards/${selectedDistrictCode}`)
        .then(response => response.json())
        .then(data => {
            const wardsSelect = document.getElementById('wards');

            // Xóa tất cả các option hiện có
            wardsSelect.innerHTML = '<option>Chọn phường xã</option>';

            // Thêm các option mới từ dữ liệu API
            data.forEach(ward => {
                const option = document.createElement('option');
                option.value = ward.code;
                option.text = ward.full_name;
                wardsSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching wards:', error));
}