import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
import { createUserModel } from '../functions/constructors'
import createNotification from '../functions/notification'
import { isStringEmpty } from '../functions/validation'
import useAxiosPrivate from '../hooks/usePrivateAxios'

const { Option } = Select

const SAVE_USER_URL = '/api/usuarios/guardarUsuario'

const UserForm = ({
	title,
	open,
	onClose,
	rolesItems,
	centrosCostosItems,
	getUsersData,
	initialValues,
	loading,
	handleLoading
}) => {
	const { roles, centrosCostos } = initialValues
	const axiosPrivate = useAxiosPrivate()

	const [form] = Form.useForm()
	const values = Form.useWatch([], form)

	const [selectedRoles, setSelectedRoles] = useState(roles)
	const [selectedCentrosCostos, setSelectedCentrosCostos] =
		useState(centrosCostos)

	const [disabled, setDisabled] = useState(true)
	const [required, setRequired] = useState(false)

	useEffect(() => {
		console.log(initialValues)
		const {
			id,
			nombre,
			apellido,
			login,
			contrasena,
			estado,
			roles,
			centrosCostos
		} = initialValues
		form.setFieldsValue({
			id,
			nombre,
			apellido,
			login,
			contrasena,
			confirmarContrasena: contrasena,
			estado,
			roles,
			centrosCostos
		})
	}, [form, initialValues])

	useEffect(() => {
		if (selectedRoles.includes(4)) {
			setDisabled(false)
			setRequired(true)
		} else {
			setDisabled(true)
			setRequired(false)
		}
	}, [selectedRoles])

	const saveUser = async model => {
		try {
			const response = await axiosPrivate.post(SAVE_USER_URL, model)
			if (response?.status === 200) {
				createNotification(
					'success',
					'Guardado!',
					'El usuario ha sido guardado correctamente'
				)
				onClose()
				getUsersData()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit = () => {
		handleLoading(true)
		form.submit()
	}

	const onFinish = values => {
		const model = createUserModel()
		model.Id = values.id
		model.Name = values.nombre
		model.LastName = values.apellido
		model.Login = values.login
		model.Password = values.contrasena
		model.State = Number(values.estado)
		model.Roles = selectedRoles
		model.CostCenters = selectedCentrosCostos
		saveUser(model)
	}

	return (
		<>
			<Drawer
				title={title}
				width={500}
				onClose={onClose}
				open={open}
				bodyStyle={{
					paddingBotton: 80
				}}
				extra={
					<Space>
						<Button onClick={onClose}>Cerrar</Button>
						<Button
							type='primary'
							onClick={handleSubmit}
							loading={loading}
							disabled={loading}
						>
							Guardar
						</Button>
					</Space>
				}
			>
				<Form
					form={form}
					onFinish={onFinish}
					name='form_user'
					layout='vertical'
					requiredMark
				>
					<Form.Item name='id'>
						<Input type='hidden' />
					</Form.Item>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								name='nombre'
								label='Nombre'
								rules={[
									{
										required: true,
										message: 'Debe ingresar un nombre'
									}
								]}
								hasFeedback
							>
								<Input
									style={{ width: '100%' }}
									autoComplete='off'
									placeholder='Ingresar un nombre'
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								name='apellido'
								label='Apellido'
								rules={[
									{
										required: true,
										message: 'Debe ingresar un apellido'
									}
								]}
								hasFeedback
							>
								<Input
									style={{ width: '100%' }}
									autoComplete='off'
									placeholder='Ingresar un apellido'
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								name='login'
								label='Login'
								rules={[
									{
										required: true,
										message: 'Debe ingresar un login'
									}
								]}
							>
								<Input
									style={{ width: '100%' }}
									autoComplete='off'
									placeholder='Ingresar un login'
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								name='contrasena'
								label='Contraseña'
								rules={[
									{
										required: true,
										message: 'Debe ingresar una contraseña'
									}
								]}
								hasFeedback
							>
								<Input.Password
									type='password'
									placeholder='Ingresar contraseña'
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								dependencies={['contrasena']}
								name='confirmarContrasena'
								label='Confirmar Contraseña'
								rules={[
									{
										required: true,
										message: 'Debe ingresar una contraseña'
									},
									{
										validator: (_, value) => {
											const contrasena = values.contrasena ?? ''
											if (!isStringEmpty(value) && contrasena !== value) {
												return Promise.reject(
													new Error('Las contraseñas ingresadas no coinciden')
												)
											}
											return Promise.resolve()
										}
									}
								]}
								hasFeedback
							>
								<Input.Password
									type='password'
									placeholder='Ingresar contraseña de nuevo'
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								name='estado'
								label='Estado'
								rules={[
									{
										required: true,
										message: 'Debe seleccionar un estado'
									}
								]}
								hasFeedback
							>
								<Select placeholder='Seleccione un estado'>
									<Option value='1'>Activo</Option>
									<Option value='2'>Inactivo</Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								name='roles'
								label='Roles'
								rules={[
									{
										required: true,
										message: 'Debe seleccionar por lo menos un rol'
									}
								]}
								hasFeedback
							>
								<Select
									mode='multiple'
									allowClear
									placeholder='Seleccione uno o varios roles'
									options={rolesItems.map(rol => {
										return { value: rol.key, label: rol.text }
									})}
									value={selectedRoles}
									onChange={setSelectedRoles}
								></Select>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								name='centroCostos'
								label='Centros de costos'
								rules={[
									{
										required,
										message: 'Debe seleccionar por lo menos un centro de costo'
									}
								]}
							>
								<Select
									mode='multiple'
									allowClear
									placeholder='Seleccione uno o varios centros de costos'
									options={centrosCostosItems.map(c => {
										return { value: c.key, label: c.text }
									})}
									value={selectedCentrosCostos}
									onChange={setSelectedCentrosCostos}
									disabled={disabled}
								></Select>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Drawer>
		</>
	)
}

export default UserForm
