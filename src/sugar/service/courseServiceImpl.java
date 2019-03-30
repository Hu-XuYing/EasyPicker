package sugar.service;
/*
 *@auther suger
 *2019
 *3:01
 */

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sugar.bean.Course;
import sugar.bean.CourseExample;
import sugar.enums.commonStatus;
import sugar.mapper.CourseMapper;

import java.util.List;

@Service
public class courseServiceImpl implements courseService{
    @Autowired
    private CourseMapper courseMapper;

    @Override
    public String addCourse(String name, Integer type, Integer parentid) {
        Course course=new Course();
        course.setName(name);
        course.setType(type);
        course.setParent(parentid);
        courseMapper.insert(course);
        CourseExample courseExample=new CourseExample();

        if(parentid!=null){
            courseExample.or().andNameEqualTo(name).andTypeEqualTo(type).andParentEqualTo(parentid);
        }else{
            courseExample.or().andNameEqualTo(name).andTypeEqualTo(type);
        }
        List<Course> courseList = courseMapper.selectByExample(courseExample);
        JSONObject jsonObject=new JSONObject();
        jsonObject.put("status",1);
        jsonObject.put("id",courseList.get(0).getId());
        return jsonObject.toJSONString();
    }

    @Override
    public List<Course> selectCourse(String range, Integer parentid) {
        CourseExample courseExample=new CourseExample();
        switch (range){
            case "parents":
                courseExample.or().andParentIsNull();
                return courseMapper.selectByExample(courseExample);
            case "children":
                courseExample.or().andParentEqualTo(parentid);
                return courseMapper.selectByExample(courseExample);
                default:
                    break;
        }
        return null;
    }

    @Override
    public String delCourse(Integer type, Integer id) {
        CourseExample courseExample=new CourseExample();

        switch (type){
            case 1:
                courseMapper.deleteByPrimaryKey(id);
                courseExample.or().andParentEqualTo(id);
                courseMapper.deleteByExample(courseExample);
                return "1";
            case 0:
                courseMapper.deleteByPrimaryKey(id);
                return "1";
                default:break;
        }
        return "0";
    }
}
