SAMPLE_CUSTOMER = {
    'f_name': 'John',
    'l_name': 'Doe',
    'email': 'john.doe@myemail.com'
}

SAMPLE_SET = {
    'name': 'Millennium Falcon',
    'price': 99.99,
    'set_number': '75192',
    'year': 2017,
    'num_parts': 7541,
    'stock': 2,
    'condition': 'New'
}

def test_get_customers_empty(client):
    """GET /customers returns empty list when no customers exist."""
    res = client.get('/customers')
    assert res.status_code == 200
    assert res.get_json() == []


def test_create_customer(client):
    """POST /customers creates a new customer and returns 201."""
    res = client.post('/customers', json=SAMPLE_CUSTOMER)
    assert res.status_code == 201
    body = res.get_json()
    assert body['f_name'] == SAMPLE_CUSTOMER['f_name']
    assert body['l_name'] == SAMPLE_CUSTOMER['l_name']
    assert body['email'] == SAMPLE_CUSTOMER['email']
    assert 'id' in body


def test_get_customers(client):
    """GET /customers returns list of customers"""
    client.post('/customers', json=SAMPLE_CUSTOMER)
    res = client.get('/customers')
    assert res.status_code == 200
    body = res.get_json()
    assert len(body) == 1
    assert body[0]['email'] == SAMPLE_CUSTOMER['email']


def test_update_customer(client):
    """PUT /customers/<id> updates fields and returns 200."""
    create_res = client.post('/customers', json=SAMPLE_CUSTOMER)
    customer_id = create_res.get_json()['id']

    updated = {**SAMPLE_CUSTOMER, 'f_name': 'Jane', 'email': 'jane.doe@example.com'}
    res = client.put(f'/customers/{customer_id}', json=updated)
    assert res.status_code == 200
    body = res.get_json()
    assert body['f_name'] == 'Jane'
    assert body['email'] == 'jane.doe@example.com'


def test_update_customer_not_found(client):
    """PUT /customers/<id> returns 404 for customer that does not exist."""
    res = client.put('/customers/999', json=SAMPLE_CUSTOMER)
    assert res.status_code == 404


def test_delete_customer(client):
    """DELETE /customers/<id> removes the customer and returns 200."""
    create_res = client.post('/customers', json=SAMPLE_CUSTOMER)
    customer_id = create_res.get_json()['id']

    res = client.delete(f'/customers/{customer_id}')
    assert res.status_code == 200

    # confirm customer no longer in list
    get_res = client.get('/customers')
    ids = [c['id'] for c in get_res.get_json()]
    assert customer_id not in ids


def test_delete_customer_not_found(client):
    """DELETE /customers/<id> returns 404 for customer that does not exist."""
    res = client.delete('/customers/999')
    assert res.status_code == 404


def test_create_customer_with_wishlist(client):
    """POST /customers with wishlist_set_ids links sets; GET /customers shows them in available_sets."""
    # create set first (required for WishlistEntry FK)
    set_res = client.post('/sets', json=SAMPLE_SET)
    set_id = set_res.get_json()['id']

    customer_with_wishlist = {**SAMPLE_CUSTOMER, 'wishlist_set_ids': [set_id]}
    client.post('/customers', json=customer_with_wishlist)

    res = client.get('/customers')
    body = res.get_json()
    available_set_ids = [s['id'] for s in body[0]['available_sets']]
    assert set_id in available_set_ids
