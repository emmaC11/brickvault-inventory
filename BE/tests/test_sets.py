# sample set data for testing
SAMPLE_SET = {
    'name': 'Millennium Falcon',
    'price': 99.99,
    'set_number': '75192',
    'year': 2017,
    'num_parts': 7541,
    'stock': 2,
    'condition': 'New'
}

# test for set routes
# Claude assisted in defining test cases
    
def test_get_sets_empty(client):
    """GET /sets returns empty list when no sets exist."""
    res = client.get('/sets')
    assert res.status_code == 200
    assert res.get_json() == []


def test_create_set(client):
    """POST /sets creates a new set and returns 201."""
    res = client.post('/sets', json=SAMPLE_SET)
    assert res.status_code == 201
    body = res.get_json()
    assert body['name'] == SAMPLE_SET['name']
    assert body['set_number'] == SAMPLE_SET['set_number']
    assert body['price'] == SAMPLE_SET['price']
    assert 'id' in body


def test_get_set_by_id(client):
    """GET /sets/<id> returns the correct set."""
    create_res = client.post('/sets', json=SAMPLE_SET)
    set_id = create_res.get_json()['id']

    res = client.get(f'/sets/{set_id}')
    assert res.status_code == 200
    assert res.get_json()['id'] == set_id


def test_get_set_by_id_not_found(client):
    """GET /sets/<id> returns 404 for set that deos not exist."""
    res = client.get('/sets/999')
    assert res.status_code == 404


def test_update_set(client):
    """PUT /sets/<id> updates fields and returns 200."""
    create_res = client.post('/sets', json=SAMPLE_SET)
    set_id = create_res.get_json()['id']

    updated = {**SAMPLE_SET, 'name': 'Updated Falcon', 'price': 149.99}
    res = client.put(f'/sets/{set_id}', json=updated)
    assert res.status_code == 200
    body = res.get_json()
    assert body['name'] == 'Updated Falcon'
    assert body['price'] == 149.99


def test_update_set_not_found(client):
    """PUT /sets/<id> returns 404 for set that does not exist."""
    res = client.put('/sets/999', json=SAMPLE_SET)
    assert res.status_code == 404


def test_delete_set(client):
    """DELETE /sets/<id> removes the set and returns 200."""
    create_res = client.post('/sets', json=SAMPLE_SET)
    set_id = create_res.get_json()['id']

    res = client.delete(f'/sets/{set_id}')
    assert res.status_code == 200

    get_res = client.get(f'/sets/{set_id}')
    assert get_res.status_code == 404


def test_delete_set_not_found(client):
    """DELETE /sets/<id> returns 404 for set that does not exist."""
    res = client.delete('/sets/999')
    assert res.status_code == 404

# integration test with React FE
def test_create_and_retrieve_set(client):
    """
    Integration test -> POST a set then GET it back
    flow of SetIntake.jsx (POST) -> InventoryList.jsx (GET)
    """

    # 1 - create the set
    create_res = client.post('/sets', json=SAMPLE_SET)
    assert create_res.status_code == 201
    set_id = create_res.get_json()['id']

    # 2 - retrieve by set_id
    get_res = client.get(f'/sets/{set_id}')
    assert get_res.status_code == 200
    body = get_res.get_json()
    assert body['name'] == SAMPLE_SET['name']
    assert body['price'] == SAMPLE_SET['price']
    assert body['set_number'] == SAMPLE_SET['set_number']
    assert body['year'] == SAMPLE_SET['year']
    assert body['stock'] == SAMPLE_SET['stock']

    # 3 - confirm it appears in set list after post/creation
    list_res = client.get('/sets')
    ids = [s['id'] for s in list_res.get_json()]
    assert set_id in ids