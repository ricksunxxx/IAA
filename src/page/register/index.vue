<template>
	<div class="login">
		<div>
			<img src="../../assets/img_denglu@2x.png" alt="" class="banner" />
			<!--<div class="breadcrumb flat">
				<a href="#" class="active">Browse</a>
				<a href="#">Compare</a>
				<a href="#">Order Confirmation</a>			
			</div>
			
			
			<div id="crumbs">
				
				
				
				<div v-for="(item,index) in crumbs_data" style="display: inline-block;">
					<span :style="{color:index===qh_bs?'red':'black'}">{{item}}</span>
					<span>-</span>					
				</div>

			</div>-->
			
			
			<div class="form form-phone" v-if="qh_bs===0">
				<span class="warn_tip" :style="{top:warnTop}" :class="{shake:isShake}">{{warnTip}}</span>
				
				
				<img src="../../assets/text_baoxianzhongjielianmeng@2x.png" alt="" class="tit_img" />

				<div class="user_name ipt_wrap">
					<input type="number" v-model="miblephone" placeholder="请输入手机号码" class="ipt" maxlength="12" @focus="focus"/>
					<img src="../../assets/btn_zhanghao@2x.png" alt="" class="icon" />
				</div>
				<div class="yzm_img">
					<input type="text" v-model="verificationImg" placeholder="请输入图形验证码" class="ipt"  @focus="focus"/>
					<img src="../../assets/btn_mima@2x.png" alt="" class="icon" />
					<div class="get_yzm">
						<span></span>
						<img :src="validCodeUrl" alt="" class="icon" @click="getValidImg"/>
					</div>
				</div>
				<div class="yzm">
					<input type="number" v-model="verification" placeholder="请输入验证码" class="ipt" @focus="focus"/>
					<img src="../../assets/btn_mima@2x.png" alt="" class="icon" />
					<div class="get_yzm" :class="{isActive:isActive}">
						<span></span>
						<span @click="getVeCode" :class="{isActive:isActive}" :style="{color:color}" >{{text_tip}}</span>
					</div>
				</div>
				<x-button class="login_btn" style="color:#ffffff;background: #FF6C2A;cursor: pointer;" @click.native="checkPhone">
					<span>{{isLoading?"验证中":"下一步"}}</span>    
					<inline-loading v-if="isLoading"></inline-loading>
				</x-button>
				<!--<div v-transfer-dom>
	                <loading></loading>
	            </div>-->
			</div>

			<div class="form form-password" v-if="qh_bs===1">
				<span class="warn_tip" :style="{top:warnTop}" :class="{shake:isShake}">{{warnTip}}</span>
				
				<img src="../../assets/text_baoxianzhongjielianmeng@2x.png" alt="" class="tit_img" />

				<div class="password ipt_wrap">
					<input type="password" placeholder="请设置密码" class="ipt" v-model="password" @focus="focus"/>
					
					<img src="../../assets/btn_mima@2x.png" alt="" class="icon" />
				</div>
				<div class="repassword ipt_wrap">
					<input type="password" placeholder="请再次输入密码" class="ipt" v-model="repassword" @focus="focus"/>
					<img src="../../assets/btn_mima@2x.png" alt="" class="icon" />
				</div>

				<x-button class="login_btn" style="color:#ffffff;background: #FF6C2A;cursor: pointer;" @click.native="setPassword">
					<span>{{isLoading?"提交中":page_bs==="forget"?"确定":"下一步"}}</span>    
					<inline-loading v-if="isLoading"></inline-loading>
					
				</x-button>
				<!--<div v-transfer-dom>
	                <loading></loading>
	            </div>-->
			</div>
			
			<!--<div class="form form-mes" v-if="qh_bs===2">
				<span class="warn_tip" :style="{top:warnTop}" :class="{shake:isShake}">{{warnTip}}</span>
				
				<img src="../../assets/text_baoxianzhongjielianmeng@2x.png" alt="" class="tit_img" />

				<div class="password ipt_wrap">
					<input type="text" placeholder="请输入公司编号" class="ipt" v-model="companyCode" @focus="focus"/>
					<img src="../../assets/sys.jpg" alt="icon" class="icon sys-icon" @click="scan" style="cursor: pointer"/>
					<img src="../../assets/btn_zhanghao@2x.png" alt="" class="icon" />
				</div>
				<div class="repassword ipt_wrap">
					<input type="text" placeholder="请输入机构代码" class="ipt" v-model="departmentCode" @focus="focus"/>
					<img src="../../assets/btn_zhanghao@2x.png" alt="" class="icon" />
				</div>

				<x-button class="login_btn" style="color:#ffffff;background: #FF6C2A;cursor: pointer;" @click.native="submit">确定</x-button>
				<div v-transfer-dom>
	                <loading></loading>
	            </div>
			</div>-->
			
			
			
			
		</div>
	</div>
</template>
<script>
	import register from "./register.js"
	export default register	
</script>
<style lang='scss' scoped>
	@import 'register'
</style>