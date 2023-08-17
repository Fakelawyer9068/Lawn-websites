window.onload = function () {
  const inquiriesDiv = document.getElementById('inquiries');

  fetch('/get-inquiries')
    .then(response => response.json())
    .then(inquiries => {
      inquiries.forEach((inquiry, index) => {
        const table = document.createElement('table');
        table.classList.add('inquiry');

        const rows = [
          ['Lawn Size:', inquiry.lawnSize],
          ['Day:', inquiry.day],
          ['Address:', inquiry.address],
          ['Phone:', inquiry.phone],
          ['Price:', '$' + inquiry.totalPrice],
          ['Delete:', `<button onclick="deleteInquiry(${inquiry.id})">Delete</button>`]
        ];

        rows.forEach((row) => {
          const tr = document.createElement('tr');
          const th = document.createElement('th');
          th.textContent = row[0];
          const td = document.createElement('td');
          td.innerHTML = row[1]; // Use innerHTML for the delete button
          tr.appendChild(th);
          tr.appendChild(td);
          table.appendChild(tr);
        });

        inquiriesDiv.appendChild(table);

        if (index < inquiries.length - 1) {
          const divider = document.createElement('hr');
          inquiriesDiv.appendChild(divider);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching inquiries:', error);
    });
};

function deleteInquiry(id) {
  fetch(`/delete-inquiry/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);
    location.reload(); // Refresh the page to update the inquiries list
  })
  .catch(error => {
    console.error('Error deleting inquiry:', error);
  });
}
